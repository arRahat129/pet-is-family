"use client";

import { motion } from "framer-motion";

export default function MotionDiv({
    children,
    delay = 0,
    className = "",
    ...props
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            whileHover={{ scale: 1.03 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}