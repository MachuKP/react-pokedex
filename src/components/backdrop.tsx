import { motion } from "framer-motion";
import styles from "./backdrop.module.scss";
import React from "react";

interface propType {
  onClick: () => void;
  children: React.ReactNode;
}

const Backdrop = ({ onClick, children }: propType) => {
  return (
    <motion.div
      className={styles.backdrop}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
