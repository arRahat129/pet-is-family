"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[75vh] w-full flex items-center justify-center px-4 bg-transparent">
            <div className="max-w-md w-full text-center py-12 px-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm">

                {/* 404 Status badge */}
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 mb-4">
                    Error 404
                </div>

                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
                    Page Not Found
                </h1>

                <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base mb-8 leading-relaxed">
                    The requested pet profile, dashboard route, or asset address could not be found or has been moved. Let's get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    {/* Secondary Navigation fallback option */}
                    <Button
                        variant="flat"
                        radius="xl"
                        className="w-full sm:w-auto bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-medium text-sm"
                        onClick={() => window.history.back()}
                        startContent={<ArrowLeft size={16} />}
                    >
                        Go Back
                    </Button>

                    {/* Return Home main call to action */}
                    <Link href="/" passHref className="w-full sm:w-auto">
                        <Button
                            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium text-sm rounded-full shadow-sm shadow-green-600/10"
                            startContent={<Home size={16} />}
                        >
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}