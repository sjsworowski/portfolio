import { useEffect, useRef } from 'react';

// Monospace cell size in px; must match .ascii-background in index.css
const CELL_W = 7.2;
const CELL_H = 12;
const CHARS = ' .:-=+*#%@';
const FRAME_MS = 40;
// Per-step energy loss; keeps ripples from building up forever
const DAMPING = 0.97;
// Waves fade out within this many cells of the screen edge, so they don't reflect back in
const EDGE_CELLS = 8;

type Field = { w: number; h: number; cur: Float32Array; prev: Float32Array; absorb: Float32Array };

const makeField = (w: number, h: number): Field => {
  // Per-cell damping: near the edges the surface is absorbed, which stops reflections
  const absorb = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const edge = Math.min(x, y, w - 1 - x, h - 1 - y);
      absorb[y * w + x] = edge < EDGE_CELLS ? DAMPING * (0.6 + 0.4 * edge / EDGE_CELLS) : DAMPING;
    }
  }
  return { w, h, cur: new Float32Array(w * h), prev: new Float32Array(w * h), absorb };
};

// One step of a discrete 2D wave equation (fluid-like surface)
function step(f: Field) {
  const { w, h, cur, prev, absorb } = f;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const avg = (cur[i - 1] + cur[i + 1] + cur[i - w] + cur[i + w]) * 0.5;
      prev[i] = (avg - prev[i]) * absorb[i];
    }
  }
  // Swap buffers: the buffer just written becomes current
  f.prev = cur;
  f.cur = prev;
}

// Adds a soft disturbance around (x, y), in cell coordinates
function inject(f: Field, x: number, y: number, amp: number, radius: number) {
  const r = Math.ceil(radius);
  const cx = Math.round(x);
  const cy = Math.round(y);
  for (let dy = -r; dy <= r; dy++) {
    for (let dx = -r; dx <= r; dx++) {
      const px = cx + dx;
      const py = cy + dy;
      if (px < 1 || py < 1 || px >= f.w - 1 || py >= f.h - 1) continue;
      const d = Math.hypot(dx, dy);
      if (d > radius) continue;
      f.cur[py * f.w + px] += amp * (1 - d / (radius + 1));
    }
  }
}

// Light the surface slopes from the upper-left; flat areas stay empty so the background is subtle
function render(f: Field): string {
  const { w, h, cur } = f;
  const lines: string[] = [];
  const lx = -0.5, ly = -0.6, lz = 0.6;
  const lLen = Math.hypot(lx, ly, lz);
  for (let y = 0; y < h; y++) {
    let line = '';
    for (let x = 0; x < w; x++) {
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) {
        line += ' ';
        continue;
      }
      const i = y * w + x;
      const gx = (cur[i + 1] - cur[i - 1]) * 4;
      const gy = (cur[i + w] - cur[i - w]) * 4;
      const nLen = Math.hypot(gx, gy, 1);
      const diffuse = Math.max(0, (-gx * lx - gy * ly + lz) / (nLen * lLen));
      const shade = Math.min(1, Math.abs(cur[i]) * 1.2 + Math.max(0, diffuse - 0.7) * 4);
      line += CHARS[Math.floor(shade * (CHARS.length - 1))];
    }
    lines.push(line);
  }
  return lines.join('\n');
}

export default function AsciiBackground() {
  const preRef = useRef<HTMLPreElement>(null);
  const fieldRef = useRef<Field | null>(null);
  // Cursor position in cell units, set on move and consumed by the next frame
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const ensureField = () => {
      const cols = Math.ceil(window.innerWidth / CELL_W);
      const rows = Math.ceil(window.innerHeight / CELL_H);
      const f = fieldRef.current;
      if (!f || f.w !== cols || f.h !== rows) fieldRef.current = makeField(cols, rows);
    };
    ensureField();

    const onResize = () => ensureField();
    const onMove = (e: MouseEvent) => {
      pointer.current = { x: e.clientX / CELL_W, y: e.clientY / CELL_H };
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove, { passive: true });

    const id = setInterval(() => {
      const f = fieldRef.current;
      if (!f) return;

      // Only the cursor stirs the surface: no ambient ripples, so the screen stays calm when the mouse is still
      const p = pointer.current;
      if (p) {
        const from = last.current ?? p;
        const dx = p.x - from.x;
        const dy = p.y - from.y;
        const dist = Math.hypot(dx, dy);
        const amp = Math.min(0.6, dist * 0.08);
        const steps = Math.max(1, Math.ceil(dist));
        for (let s = 0; s <= steps; s++) {
          inject(f, from.x + (dx * s) / steps, from.y + (dy * s) / steps, amp, 2.5);
        }
        last.current = p;
        pointer.current = null;
      }

      step(f);
      // Write straight to the DOM: avoids re-rendering a full-screen string through React each frame
      if (preRef.current) preRef.current.textContent = render(f);
    }, FRAME_MS);

    return () => {
      clearInterval(id);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <pre ref={preRef} className="ascii-background" aria-hidden="true" />
  );
}
