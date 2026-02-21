export default function Footer({ name }) {
  return (
    <footer className="footer">
      <div className="container">
        © {new Date().getFullYear()} {name}. Built with React + Framer Motion.
      </div>
    </footer>
  );
}
