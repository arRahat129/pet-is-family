"use client";

import React from "react";
import { Spinner } from "@heroui/react";

export default function DashboardLoading() {
    return (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-3 bg-transparent">
            {/* HeroUI Spinner utilizing your semantic theme color */}
            <Spinner
                size="lg"
                color="success"
                label="Loading dashboard metrics..."
                classNames={{
                    label: "text-sm font-medium text-green-800 dark:text-neutral-400 mt-2"
                }}
            />
        </div>
    );
}