"use client";

import { motion } from "framer-motion";

const MotionWrapper = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.5,
                delay,
                ease: "easeOut"
            }}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapper;