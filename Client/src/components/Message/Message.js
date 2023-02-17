import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import React from "react";
import "./styles.css";

const Message = () => {
  const modal = useSelector((state) => state.modal);

  return (
    <>
      {modal !== null && (
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="modal">
          <p>{modal}.</p>
        </motion.div>
      )}
    </>
  );
};

export default Message;
