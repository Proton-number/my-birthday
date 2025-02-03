"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";

export default function FloatingButton() {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisibility = (): void => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => toggleVisibility();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="absolute bottom-6 right-6"
        >
          <Button onClick={scrollToTop} size="icon">
            <ChevronUp />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
