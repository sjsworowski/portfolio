# 🎮 Steven Sworowski - Gameboy Portfolio

A unique, immersive portfolio website styled as a classic **Gameboy gaming device** crossed with **RuneScape/Pokemon** retro aesthetics. Features animated ASCII 3D backgrounds, authentic green LCD screen styling, and nostalgic 8-bit gaming vibes.

## ✨ Features

- **Gameboy LCD Screen Aesthetic**: Authentic green #9bbc0f color scheme
- **Animated ASCII 3D Background**: Floating magical text elements with rotation effects
- **Retro Gaming Atmosphere**: Pokemon/RuneScape fantasy fusion
- **Scanline CRT Effect**: Authentic LCD monitor feel
- **8-bit Pixel Perfect**: Monospace typography with retro gaming vibe
- **Responsive Design**: Gameboy aesthetic maintained across all devices
- **Smooth Animations**: Floating ASCII, scanlines, window interactions
- **Modern Stack**: Built with React, TypeScript, Tailwind CSS, and Vite

## ✨ Features

- **Retro UI Design**: Windows 95-inspired windows, buttons, and interface elements
- **Pixel Art**: Custom pixel art sprite animations
- **Responsive Design**: Fully responsive across all devices with retro aesthetic maintained
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Dark Mode Retro**: Green CRT monitor aesthetic with authentic color palette
- **Interactive Sections**: About, Experience, and Projects windows with smooth scrolling
- **Modern Stack**: Built with React, TypeScript, Tailwind CSS, and Vite

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + Custom CSS
- **Build Tool**: Vite 6
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Fonts**: Press Start 2P, Space Mono (pixel-perfect typography)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser. The app will hot-reload as you make changes.

### Build

```bash
npm run build
```

The production-ready build will be in the `dist` folder.

### Preview

```bash
npm run preview
```

Preview the built app locally before deployment.

## 🎮 VS Code Integration

### Debug Mode

Press `F5` or go to Run > Start Debugging to:
1. Automatically start the Vite dev server
2. Launch Chrome with the portfolio
3. Enable source maps for debugging

The configuration is in `.vscode/launch.json` and tasks are in `.vscode/tasks.json`.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   └── Projects.tsx
│   ├── assets/              # Images and static assets
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles with retro theme
├── public/                  # Static files
│   ├── bg.png              # Background texture
│   └── pixel-art-v3.png    # Sprite animation sheet
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Color Palette

The retro green CRT monitor theme uses authentic 90s colors:

- **Background**: `#54876f` (Retro Green)
- **Dark Accents**: `#1a2823`, `#2e4a41` (Deep Forest)
- **Highlights**: `#c6e3d1`, `#b6d3c2` (Light Green)
- **Text**: `#e8f5f0` (Off-white)

## 🎯 Customization

### Modify Colors

Edit the CSS variables in `src/index.css`:

```css
:root {
  --crt-bg: #54876f;
  --crt-bg-light: #5d9d7a;
  --crt-text: #e8f5f0;
  /* ... other colors */
}
```

### Update Content

- **About**: Edit `src/components/About.tsx`
- **Experience**: Edit `src/components/Experience.tsx`
- **Projects**: Edit `src/components/Projects.tsx`

### Add New Sections

1. Create a new component in `src/components/`
2. Import it in `App.tsx`
3. Add navigation menu item
4. Style with the existing retro classes

## 📱 Responsive Breakpoints

- **Mobile**: < 600px (optimized for small screens)
- **Tablet**: 600px - 1024px
- **Desktop**: > 1024px (full retro experience)

## 🚀 Deployment

Deploy to Firebase, Vercel, Netlify, or any static host:

```bash
npm run build
# Upload the dist/ folder to your hosting
```

### Firebase Deployment

GitHub Actions deploys the two Firebase Hosting sites in project `portfolio-302eb`:

| Environment | Hosting site | URL | Trigger |
| --- | --- | --- | --- |
| Staging | `portfolio-302eb` | `https://portfolio-302eb.web.app` (also `https://portfolio-302eb.firebaseapp.com`) | Push to `main` |
| Production | `sworowski-prod` | `https://sworowski.dev` | Push a tag ending in `-prod`, such as `v1.2.3-prod` |

These are separate Hosting sites, but they share the same Firebase project and
any other Firebase resources in it. The workflow uses the GitHub Actions secret
`FIREBASE_SERVICE_ACCOUNT`; its service account needs permission to deploy to
both sites.

#### Initial setup and domain migration

1. In the [Firebase Hosting console](https://console.firebase.google.com/project/portfolio-302eb/hosting), create a second site with the ID `sworowski-prod`. Site IDs are globally unique; if it is unavailable, choose another ID and update `.firebaserc` before deploying.
2. The custom domain can belong to only one Hosting site. If `sworowski.dev` is currently connected to the existing site, remove it from that site before the new workflow deploys staging. This can temporarily interrupt the custom domain.
3. Commit and push the deployment configuration to `main`. Check the staging deployment in the repository's Actions tab and at the staging URL.
4. Create and push a production tag on the tested `main` commit as shown below. Check that the production deployment succeeded in Actions and at `https://sworowski-prod.web.app`.
5. In Firebase Hosting, open the `sworowski-prod` site and add `sworowski.dev`. Follow the Console's DNS and verification instructions at your domain registrar; keep any required ownership TXT record. Wait for the domain and SSL certificate to become active, then check `https://sworowski.dev`. If you want `www.sworowski.dev`, configure it separately in Firebase and DNS.

For each later release, test the commit on staging, then tag and push that
commit:

```bash
git checkout main
git pull origin main
git tag v1.2.3-prod
git push origin v1.2.3-prod
```

Use a new tag for each release. The tagged commit is what gets deployed, and
must contain the deployment workflow; tagging an older commit can deploy older
code or use its older workflow. Other tags do not trigger this workflow.

For manual deployment, build first and explicitly choose one target:

```bash
npm run build
firebase deploy --only hosting:staging
# Or: firebase deploy --only hosting:production
```

Avoid an unqualified `firebase deploy`, which can deploy both Hosting sites.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Steven Sworowski**

Portfolio: [Live Demo](https://your-domain.com)
GitHub: [GitHub Profile](https://github.com/sjsworowski)

---

Made with ❤️ and nostalgic 90s vibes 🖥️
