"use client";

import { motion } from "framer-motion";

const MotionWrapperStatic = ({
    children,
    delay = 0,
    y = 40,
    scale = 1,
}) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y,
                scale,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapperStatic;