"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface LoadingProps {
  children: React.ReactNode;
}

function Loader({ children }: LoadingProps) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <motion.div className="flex justify-center items-center h-screen">
        <h3>load....</h3>
      </motion.div>
    );
  }
  return <>{children}</>;
}

export default Loader;
