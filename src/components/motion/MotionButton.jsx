"use client";

import { motion } from "framer-motion";

const MotionButton = ({ children }) => {
    return (
        <motion.button
            animate={{
                scale: [1, 1.08, 1],
            }}
            transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="bg-green-600 text-white text-sm px-4 py-1 rounded-full"
        >
            {children}
        </motion.button>
    );
};

export default MotionButton;