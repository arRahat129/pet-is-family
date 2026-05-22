"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@heroui/react";
import {
    Menu,
    LogOut,
    Home,
    FileText,
    PlusCircle,
    Layers,
    X,
    LayoutDashboard
} from "lucide-react";

import logoImg from "@/assets/logo.png";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/homepage/ThemeToogle";

export default function DashboardLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const menuRef = useRef(null);

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // Handle clicking outside to close the user dropdown menu
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await authClient.signOut();
        setUserMenuOpen(false);
        setMobileOpen(false);
        router.push("/signin");
    };

    const dashboardRoutes = [
        { name: "Home", href: "/", icon: Home },
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Requests", href: "/my-requests", icon: FileText },
        { name: "Add Pet", href: "/add-pet", icon: PlusCircle },
        { name: "My Listings", href: "/listings", icon: Layers },
    ];

    if (isPending) {
        return (
            <div className="flex min-h-screen text-green-950 dark:text-neutral-100">
                <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-green-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-5">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 w-40 bg-green-100 dark:bg-neutral-800 rounded-lg" />
                        <div className="space-y-3 mt-10">
                            <div className="h-10 bg-green-100 dark:bg-neutral-800 rounded-lg" />
                            <div className="h-10 bg-green-100 dark:bg-neutral-800 rounded-lg" />
                            <div className="h-10 bg-green-100 dark:bg-neutral-800 rounded-lg" />
                            <div className="h-10 bg-green-100 dark:bg-neutral-800 rounded-lg" />
                        </div>
                    </div>
                </aside>

                <div className="md:pl-64 flex-1 flex flex-col w-full">
                    <header className="h-16 border-b border-green-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 md:px-8 flex items-center justify-between">
                        <div className="h-8 w-32 bg-green-100 dark:bg-neutral-800 rounded-lg animate-pulse" />
                    </header>

                    <main className="flex-1 px-4 py-6 md:px-8">
                        <div className="mx-auto max-w-7xl rounded-xl border border-green-200 dark:border-neutral-800 p-6 shadow-sm">
                            <div className="animate-pulse space-y-4">
                                <div className="h-8 w-56 rounded-lg" />
                                <div className="h-40 rounded-2xl" />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen text-green-950 dark:text-neutral-100 font-sans">

            {/* SIDEBAR */}
            <aside className="hidden md:flex fixed inset-y-0 left-0 z-20 w-64 flex-col border-r border-green-200 dark:border-neutral-800 px-4 py-5">
                <div className="mb-8 px-2">
                    <Link href="/" className="flex flex-col gap-1.5 items-start">
                        <div className="flex gap-2 items-center">
                            <Image src={logoImg} alt="Logo" className="w-8 h-8 object-contain" />
                            <span className="text-xl font-bold text-green-900 dark:text-white">
                                PetIsFamily
                            </span>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold text-green-800 dark:text-neutral-200 border border-green-200 dark:border-neutral-700">
                            Dashboard
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 space-y-1">
                    {dashboardRoutes.map((route) => {
                        const Icon = route.icon;
                        const isActive = pathname === route.href;

                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                    ? "bg-green-800 text-white"
                                    : "text-green-800 dark:text-neutral-300 hover:bg-green-50 dark:hover:bg-neutral-800"
                                    }`}
                            >
                                <Icon size={18} />
                                {route.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* USER INFO PANEL FOOTER */}
                <div className="mt-auto border-t border-green-200 dark:border-neutral-800 pt-4 px-2">
                    {user && (
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <Avatar.Image src={user?.image || ""} name={user?.name || "User"} />
                                <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                            </Avatar>

                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-green-950 dark:text-white">
                                    {user?.name}
                                </span>
                                <span className="text-xs text-green-700 dark:text-neutral-400">
                                    {user?.email}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* MAIN CONTAINER */}
            <div className="md:pl-64 flex flex-col flex-1 w-full bg-green-50/30 dark:bg-neutral-950">

                {/* HEADER */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-green-200 dark:border-neutral-800 bg-white/85 dark:bg-neutral-900/80 backdrop-blur px-4 md:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden p-1 text-green-950 dark:text-neutral-100"
                            onClick={() => setMobileOpen(true)}
                        >
                            <Menu size={22} className="text-black dark:text-white" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 relative" ref={menuRef}>
                        <ThemeToggle />

                        {/* USER AVATAR BUTTON */}
                        {user && (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen((p) => !p)}
                                    className="flex items-center gap-2 px-1 py-1 rounded-full focus:outline-none hover:ring-2 hover:ring-green-200 dark:hover:ring-neutral-800 transition"
                                >
                                    <Avatar>
                                        <Avatar.Image src={user?.image || ""} name={user?.name || "User"} />
                                        <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                                    </Avatar>
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-neutral-900 border border-green-200 dark:border-neutral-800 rounded-xl shadow-xl overflow-hidden z-50 text-neutral-800 dark:text-neutral-100">
                                        <Link
                                            href="/"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="block px-4 py-2.5 text-sm text-green-900 dark:text-neutral-200 hover:bg-green-50 dark:hover:bg-neutral-800 font-medium"
                                        >
                                            Return to Website
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 font-medium border-t border-green-100 dark:border-neutral-800"
                                        >
                                            <LogOut size={16} className="inline mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </header>

                {/* CONTENT AREA */}
                <main className="flex-1 px-4 py-6 md:px-8">
                    <div className="max-w-7xl mx-auto bg-white dark:bg-neutral-900 border border-green-200 dark:border-neutral-800 rounded-xl p-6 min-h-[calc(100vh-7.5rem)] shadow-sm text-green-950 dark:text-neutral-100">
                        {children}
                    </div>
                </main>
            </div>

            {/* MOBILE NAVIGATION */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 md:hidden">
                    <div className="absolute left-0 top-0 w-72 h-full bg-white dark:bg-neutral-900 p-5 border-r border-green-200 dark:border-neutral-800">
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-bold text-green-900 dark:text-white">Navigation</span>
                            <button className="text-green-950 dark:text-neutral-100" onClick={() => setMobileOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <nav className="space-y-2">
                            {dashboardRoutes.map((route) => {
                                const Icon = route.icon;
                                const isActive = pathname === route.href;
                                return (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                            ? "bg-green-800 text-white"
                                            : "text-green-800 dark:text-neutral-300 hover:bg-green-50 dark:hover:bg-neutral-800"
                                            }`}
                                    >
                                        <Icon size={18} />
                                        {route.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
}