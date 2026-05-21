"use client";

import { motion } from "framer-motion";

export const TextMotion = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.div>
    );
};