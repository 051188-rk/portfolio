export default function Section({ id, title, hint, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="sectionHeader">
          <h2 className="sectionTitle">{title}</h2>
          {hint ? <div className="sectionHint">{hint}</div> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
