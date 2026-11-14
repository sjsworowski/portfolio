const Contact = () => (
  <footer className="gb-footer">
    <a
      href="https://www.linkedin.com/in/steven-sworowski"
      target="_blank"
      rel="noopener noreferrer"
      className="btn sidebar-link"
    >
      <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
      LINKEDIN
    </a>
    <a href="mailto:sjsworowski@gmail.com" className="btn sidebar-link">
      <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="20" height="14" x="2" y="5" />
        <path d="m22 7-8.97 6.48a2 2 0 0 1-2.06 0L2 7" />
      </svg>
      EMAIL
    </a>
    <a
      href="/Steven Sworowski - Software Engineer.pdf"
      download
      className="btn sidebar-link"
    >
      <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
      DOWNLOAD CV
    </a>
  </footer>
);

export default Contact;
