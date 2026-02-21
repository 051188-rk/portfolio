import { motion } from "framer-motion";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function BottomNav({ items, activeId }) {
  return (
    <div className="bottomNavWrap">
      <motion.nav
        className="bottomNav"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`navBtn ${isActive ? "navBtnActive" : ""}`}
              onClick={() => scrollToId(item.id)}
              aria-label={item.label}
            >
              <Icon />
              <span className="tooltip">{item.label}</span>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}
