"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Avatar } from "@heroui/react";
import {
    Menu,
    LogOut,
    Home,
    FileText,
    PlusCircle,
    Layers,
    X
} from "lucide-react";
import logoImg from "@/assets/logo.png";

export default function DashboardLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const pathname = usePathname();

    const dashboardRoutes = [
        { name: "Home", href: "/", icon: Home },
        { name: "My Requests", href: "/my-requests", icon: FileText },
        { name: "Add Pet", href: "/add-pet", icon: PlusCircle },
        { name: "My Listings", href: "/listings", icon: Layers },
    ];

    return (
        <div className="flex min-h-screen bg-green-50/30 text-green-950 font-sans antialiased">


            <aside className="hidden md:flex fixed inset-y-0 left-0 z-20 w-64 flex-col border-r border-green-100 bg-white px-4 py-5">

                <div className="mb-8 px-2">
                    <Link href="/" className="flex flex-col gap-1.5 items-start">
                        <div className="flex gap-2 items-center">
                            <Image src={logoImg} alt="Logo" className="w-8 h-8 object-contain" />
                            <span className="text-xl font-bold tracking-tight text-green-900">
                                PetIsFamily
                            </span>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
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
                                    ? "bg-green-800 text-white shadow-sm"
                                    : "text-green-800 hover:bg-green-50 hover:text-green-950"
                                    }`}
                            >
                                <Icon size={18} className={isActive ? "text-white" : "text-green-700"} />
                                {route.name}
                            </Link>
                        );
                    })}
                </nav>


                <div className="mt-auto border-t border-green-100 pt-4 flex items-center gap-3 px-2">
                    <Avatar src="#" size="sm" />
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-green-900 truncate">User Name</span>
                        <span className="text-xs text-green-700 truncate">john@email.com</span>
                    </div>
                </div>
            </aside>



            <div className="md:pl-64 flex flex-col flex-1 min-w-0">


                <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-green-100 bg-white/85 px-4 md:px-8 backdrop-blur-md">



                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden text-green-900 p-1 hover:bg-green-50 rounded"
                            onClick={() => setMobileOpen(true)}
                        >
                            <Menu size={22} />
                        </button>


                        <div className="flex items-center gap-2 md:hidden">
                            <Image src={logoImg} alt="Logo" className="w-7 h-7" />
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                                Dashboard
                            </span>
                        </div>
                    </div>



                    <div className="relative">
                        <button
                            onClick={() => setUserMenuOpen((p) => !p)}
                            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-green-100 transition"
                        >
                            <Avatar src="#" size="sm" />
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-medium text-green-900">User Name</p>
                                <p className="text-xs text-green-700">john@email.com</p>
                            </div>
                        </button>

                        {
                            userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-green-100 rounded-lg shadow-lg overflow-hidden z-50">
                                    <Link
                                        href="/"
                                        onClick={() => setUserMenuOpen(false)}
                                        className="block px-4 py-2 text-sm hover:bg-green-50 text-green-900"
                                    >
                                        Return to Website
                                    </Link>

                                    <button
                                        onClick={() => setUserMenuOpen(false)}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-green-50 border-t border-slate-50"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </header>


                <main className="flex-1 px-4 py-6 md:px-8">
                    <div className="mx-auto max-w-7xl bg-white rounded-xl border border-green-100/50 p-6 shadow-sm min-h-[calc(100vh-7.5rem)]">
                        {children}
                    </div>
                </main>
            </div>


            {
                mobileOpen && (
                    <div className="fixed inset-0 bg-green-950/40 z-50 md:hidden animate-fade-in">
                        <div className="absolute left-0 top-0 w-72 h-full bg-white p-5 border-r border-green-100 flex flex-col">

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <Image src={logoImg} alt="Logo" className="w-8 h-8" />
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-green-100 text-green-800">
                                        Dashboard
                                    </span>
                                </div>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-1 rounded text-green-900 hover:bg-green-50"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="flex-1 space-y-1">
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
                                                : "text-green-800 hover:bg-green-50"
                                                }`}
                                        >
                                            <Icon size={18} />
                                            {route.name}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <hr className="my-4 border-green-100" />

                            <button className="text-left text-red-500 flex items-center gap-2 py-2 px-3 hover:bg-red-50 rounded-lg">
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}