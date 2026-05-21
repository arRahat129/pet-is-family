"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-8 h-8" />;

    const current = theme === "system" ? resolvedTheme : theme;

    return (
        <button
            onClick={() =>
                setTheme(current === "dark" ? "light" : "dark")
            }
            className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-gray-800 transition"
        >
            {current === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}