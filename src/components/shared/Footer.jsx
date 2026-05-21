"use client";

import Link from "next/link";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-green-50 dark:bg-neutral-950 border-t border-green-100 dark:border-neutral-800 text-green-900 dark:text-neutral-200">
            <div className="max-w-7xl mx-auto px-4 py-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* BRAND */}
                    <div>
                        <h2 className="text-xl font-bold text-green-900 dark:text-white">
                            PetIsFamily
                        </h2>
                        <p className="mt-2 text-sm text-green-700 dark:text-gray-400">
                            Giving every pet a loving home. Adopt, donate, and make a difference.
                        </p>
                    </div>

                    {/* CONTACT */}
                    <div className="mx-auto">
                        <h3 className="text-md font-semibold text-green-900 dark:text-white mb-3">
                            Contact Information
                        </h3>

                        <div className="flex flex-col gap-2 text-sm text-green-800 dark:text-gray-300">

                            <div className="flex items-center gap-2">
                                <MdEmail size={18} />
                                <span className="dark:text-gray-300">rahashik@gmail.com</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <MdPhone size={18} />
                                <span className="dark:text-gray-300">+880 1234567890</span>
                            </div>

                            <div className="text-green-700 dark:text-gray-400">
                                Chattogram, Bangladesh
                            </div>

                        </div>
                    </div>

                    {/* SOCIAL */}
                    <div className="ml-auto px-10">
                        <h3 className="text-md font-semibold text-green-900 dark:text-white mb-3">
                            Social Links
                        </h3>

                        <div className="flex gap-4">

                            <Link href="#" className="hover:text-blue-700 transition">
                                <FaFacebookF size={18} />
                            </Link>

                            <Link href="#" className="hover:text-red-700 transition">
                                <FaInstagram size={18} />
                            </Link>

                            <Link href="#" className="hover:text-blue-500 transition">
                                <FaTwitter size={18} />
                            </Link>

                        </div>
                    </div>

                </div>

                {/* BOTTOM */}
                <div className="mt-10 border-t border-green-100 dark:border-neutral-800 pt-5 text-center text-sm text-green-700 dark:text-gray-400">
                    © {new Date().getFullYear()} PetIsFamily. All rights reserved.
                </div>

            </div>
        </footer>
    );
}