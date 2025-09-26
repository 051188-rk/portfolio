import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "./assets/image3.png";

export default function Loader() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, 2800); // total animation time
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black "
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ backgroundColor: 'black' }}
        >
          <motion.div
            initial={{ scale: 0.2, y: 0 }}
            animate={{ scale: 0.8, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
            className="flex items-center justify-center w-full h-full"
            style={{ width: '100vw', height: '100vh' }}
          >
            <img
              src={logo}
              alt="rksh. logo"
              className="w-full h-full object-contain invert z-10"
              draggable={false}
            />
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}