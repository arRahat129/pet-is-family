"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@heroui/react";
import { Menu, LogOut } from "lucide-react";
import Image from "next/image";
import logoImg from "@/assets/logo.png";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const routes = [
        { name: "Home", href: "/" },
        { name: "All Pets", href: "/all-pets" },
    ];

    return (
        <>
            <header className="w-full bg-green-50 border-b border-green-100 text-green-950 relative z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden text-green-900"
                            onClick={() => setMobileOpen(true)}
                        >
                            <Menu size={22} />
                        </button>

                        <Link href="/" className="font-bold text-xl flex gap-2 items-center">
                            <Image src={logoImg} alt="Logo" className="w-10 h-10" />
                            <h1 className="text-2xl font-bold text-green-900">
                                PetIsFamily
                            </h1>
                        </Link>
                    </div>

                    {/* CENTER */}
                    <nav className="hidden md:flex gap-8">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className="text-sm text-green-800 hover:text-green-950 font-medium transition"
                            >
                                {route.name}
                            </Link>
                        ))}
                    </nav>

                    {/* USER */}
                    <div className="relative">
                        <button
                            onClick={() => setUserMenuOpen((p) => !p)}
                            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-green-100 transition"
                        >
                            <Avatar src="#" size="sm" />
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-medium text-green-900">
                                    User Name
                                </p>
                                <p className="text-xs text-green-700">
                                    john@email.com
                                </p>
                            </div>
                        </button>

                        {userMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-green-100 rounded-lg shadow-lg overflow-hidden">
                                <Link
                                    href="/dashboard"
                                    onClick={() => setUserMenuOpen(false)}
                                    className="block px-4 py-2 text-sm hover:bg-green-50 text-green-900"
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={() => setUserMenuOpen(false)}
                                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-green-50"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* MOBILE MENU */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black/30 z-50">
                    <div className="absolute left-0 top-0 w-72 h-full bg-green-50 p-5 border-r border-green-100">

                        <button
                            onClick={() => setMobileOpen(false)}
                            className="mb-5 text-green-900"
                        >
                            ✕
                        </button>

                        <div className="flex flex-col gap-4">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-green-800 font-medium"
                                >
                                    {route.name}
                                </Link>
                            ))}

                            <hr className="my-2 border-green-200" />

                            <Link
                                href="/dashboard"
                                onClick={() => setMobileOpen(false)}
                                className="text-green-800"
                            >
                                Dashboard
                            </Link>

                            <button className="text-left text-red-500 flex items-center gap-2">
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}