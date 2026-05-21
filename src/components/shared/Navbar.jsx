"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import { Menu, LogOut, X } from "lucide-react";
import Image from "next/image";
import logoImg from "@/assets/logo.png";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "../homepage/ThemeToogle";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await authClient.signOut();

        setUserMenuOpen(false);
        setMobileOpen(false);

        router.push("/signin");
    };

    const routes = [
        { name: "Home", href: "/" },
        { name: "All Pets", href: "/all-pets" },
    ];

    if (isPending) {
        return (
            <header className="w-full bg-green-50 dark:bg-neutral-950 border-b border-green-100 dark:border-neutral-800 h-20 animate-pulse" />
        );
    }

    return (
        <>
            <header className="w-full bg-green-50 dark:bg-neutral-950 border-b border-green-100 dark:border-neutral-800 text-green-950 dark:text-neutral-200 relative z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden text-green-900 dark:text-neutral-200"
                            onClick={() => setMobileOpen(true)}
                        >
                            <Menu size={22} />
                        </button>

                        <Link href="/" className="font-bold text-xl flex gap-2 items-center">
                            <Image src={logoImg} alt="Logo" className="w-10 h-10" />
                            <h1 className="text-2xl font-bold text-green-900 dark:text-white">
                                PetIsFamily
                            </h1>
                        </Link>
                    </div>

                    <nav className="hidden md:flex gap-8">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={`text-sm font-medium pb-1 border-b-2 transition ${pathname === route.href
                                    ? "border-green-700 text-green-950 dark:text-white"
                                    : "border-transparent text-green-800 dark:text-gray-300 hover:text-green-950 dark:hover:text-white hover:border-green-400"
                                    }`}
                            >
                                {route.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="relative flex items-center gap-3">
                        <ThemeToggle />

                        {!user ? (
                            <>
                                <Link href="/signin">
                                    <Button variant="outline" className="rounded-xl">
                                        Login
                                    </Button>
                                </Link>

                                <Link href="/signup">
                                    <Button className="bg-green-600 text-white rounded-xl">
                                        Join for Free
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => setUserMenuOpen((p) => !p)}
                                    className="flex items-center gap-2 px-2 py-1 rounded-lg border-none hover:bg-green-100 dark:hover:bg-neutral-800"
                                >
                                    <Avatar>
                                        <Avatar.Image
                                            referrerPolicy="no-referrer"
                                            src={user?.image || ""}
                                            name={user?.name || "User"}
                                            size="sm"
                                        />
                                        <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                                    </Avatar>

                                    <div className="hidden sm:block text-left">
                                        <p className="text-sm font-medium text-green-900 dark:text-white">
                                            {user?.name}
                                        </p>
                                        <p className="text-xs text-green-700 dark:text-gray-400">
                                            {user?.email}
                                        </p>
                                    </div>
                                </Button>

                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 top-14 w-48 bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-lg shadow-lg overflow-hidden"
                                        >

                                            <div className="flex items-center justify-between px-4 py-2 border-b dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                                                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                                    Account
                                                </span>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    radius="sm"
                                                    onClick={() => setUserMenuOpen(false)}
                                                    className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 min-w-7 w-7 h-7"
                                                    aria-label="Close menu"
                                                >
                                                    <X size={14} strokeWidth={2.5} />
                                                </Button>
                                            </div>

                                            <Link
                                                href="/dashboard"
                                                className="block px-4 py-2 text-sm hover:bg-green-50 dark:hover:bg-neutral-800"
                                            >
                                                Dashboard
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-green-50 dark:hover:bg-neutral-800"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 dark:bg-black/60 z-50"
                    >
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "tween", duration: 0.2 }}
                            className="absolute left-0 top-0 w-72 h-full bg-green-50 dark:bg-neutral-950 p-5 border-r border-green-100 dark:border-neutral-800"
                        >
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="mb-5 text-green-900 dark:text-white"
                            >
                                ✕
                            </button>

                            <div className="flex flex-col gap-4">
                                {routes.map((route) => (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`text-sm font-medium pb-1 transition ${
                                            pathname === route.href
                                                ? "text-green-950 dark:text-white"
                                                : "text-green-800 dark:text-gray-300 hover:text-green-950 dark:hover:text-white"
                                        }`}
                                    >
                                        {route.name}
                                    </Link>
                                ))}

                                <hr className="my-2 border-green-200 dark:border-neutral-800" />

                                {user ? (
                                    <>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setMobileOpen(false)}
                                            className="text-green-800 dark:text-gray-300"
                                        >
                                            Dashboard
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="text-left text-red-500"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/signin">Login</Link>
                                        <Link href="/signup">Join for Free</Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}