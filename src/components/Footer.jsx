export default function Footer({ name }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerCard">
          <div>
            © {new Date().getFullYear()} {name}.
          </div>
          <div>
            Built with React + Framer Motion.
          </div>
        </div>
      </div>
    </footer>
  );
}
