"use client";

import { motion } from "framer-motion";

const MotionWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
            whileHover={{
                y: -8,
                scale: 1.02,
            }}
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapper;