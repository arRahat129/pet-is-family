"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Avatar } from "@heroui/react";
import { Menu, LogOut } from "lucide-react";
import Image from "next/image";
import logoImg from "@/assets/logo.png";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const routes = [
        { name: "Home", href: "/" },
        { name: "Adopt Pets", href: "/adopt" },
        { name: "Donate", href: "/donate" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <header className="w-full bg-white border-b text-black relative z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

                    {/* LEFT: Mobile Hamburger + Logo */}
                    <div className="flex items-center gap-3">
                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden"
                            onClick={() => setMobileOpen(true)}
                        >
                            <Menu size={22} />
                        </button>

                        <Link href="/" className="font-bold text-xl flex gap-2 items-center">
                            <Image
                                src={logoImg}
                                alt="Logo Image"
                                className="w-10 h-10"
                            />
                            <h1 className="text-3xl font-bold text-green-900">PetIsFamily</h1>
                        </Link>
                    </div>


                    <nav className="hidden md:flex gap-8">
                        {
                            routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className="text-sm text-gray-600 hover:text-black transition font-bold"
                                >
                                    {route.name}
                                </Link>
                            ))
                        }
                    </nav>


                    <div className="relative">

                        <button
                            onClick={() => setUserMenuOpen((prev) => !prev)}
                            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100"
                        >
                            <Avatar src="#" size="sm" />
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-medium leading-tight">User Name</p>
                                <p className="text-xs text-gray-500">john@email.com</p>
                            </div>
                        </button>

                        {
                            userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden">
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setUserMenuOpen(false)}
                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                        Dashboard
                                    </Link>

                                    <button
                                        onClick={() => {
                                            setUserMenuOpen(false);
                                            // logout logic
                                        }}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </header>

            {
                mobileOpen && (
                    <div className="fixed inset-0 bg-black/40 z-50">
                        <div className="absolute left-0 top-0 w-72 h-full bg-white p-5">

                            <button
                                onClick={() => setMobileOpen(false)}
                                className="mb-5 text-black"
                            >
                                ✕
                            </button>

                            <div className="flex flex-col gap-4">
                                {routes.map((route) => (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-gray-700"
                                    >
                                        {route.name}
                                    </Link>
                                ))}

                                <hr className="my-2" />

                                <Link
                                    href="/dashboard"
                                    onClick={() => setMobileOpen(false)}
                                    className="text-gray-700"
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={() => {
                                        setMobileOpen(false);
                                        // logout
                                    }}
                                    className="text-left text-red-500 flex items-center gap-2"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}