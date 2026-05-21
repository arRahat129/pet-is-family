"use client";

import React from "react";
import { Spinner } from "@heroui/react";

export default function Loading() {
    return (
        <div className="min-h-[70vh] w-full flex flex-col items-center justify-center gap-4 bg-transparent text-neutral-900 dark:text-neutral-100">
            <div className="flex flex-col items-center gap-3">
                {/* HeroUI Spinner utilizing your custom theme accent */}
                <Spinner
                    size="lg"
                    color="success"
                    label="Fetching latest details..."
                    classNames={{
                        label: "text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-2"
                    }}
                />
            </div>
        </div>
    );
}