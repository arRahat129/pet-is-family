"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { LayoutDashboard, ArrowLeft } from "lucide-react";

export default function DashboardNotFound() {
    return (
        <div className="w-full min-h-[55vh] flex items-center justify-center bg-transparent">
            <div className="max-w-md w-full text-center py-10 px-4">

                {/* 404 Visual Indicator Badge */}
                <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/20 mb-4">
                    Listing / Route Missing
                </div>

                <h1 className="text-2xl font-bold text-green-950 dark:text-white mb-2 tracking-tight">
                    Content Not Found
                </h1>

                <p className="text-green-800 dark:text-neutral-400 text-sm mb-6 leading-relaxed">
                    The specific dashboard metric page, listing item, or requested configuration could not be loaded. It might have been deleted or relocated.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    {/* Fallback to previous window location state context */}
                    <Button
                        variant="flat"
                        size="md"
                        className="w-full sm:w-auto bg-green-50 hover:bg-green-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-green-900 dark:text-neutral-200 font-medium text-sm rounded-lg"
                        onClick={() => window.history.back()}
                        startContent={<ArrowLeft size={16} />}
                    >
                        Go Back
                    </Button>

                    {/* Direct safe routing reset fallback option */}
                    <Link href="/dashboard" passHref className="w-full sm:w-auto">
                        <Button
                            size="md"
                            className="w-full sm:w-auto bg-green-800 hover:bg-green-700 text-white font-medium text-sm rounded-lg shadow-sm"
                            startContent={<LayoutDashboard size={16} />}
                        >
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}