"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input, Dropdown, Button, Label } from "@heroui/react";
import { Search, PawPrint, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";

export default function FilterPanel({
    currentSearch,
    currentSpecies,
    currentSort
}) {
    const router = useRouter();
    const pathname = usePathname();

    const [search, setSearch] = useState(currentSearch || "");
    const [species, setSpecies] = useState(currentSpecies || "");
    const [sort, setSort] = useState(currentSort || "newest");

    const updateQueryParams = (s = search, sp = species, so = sort) => {
        const params = new URLSearchParams();

        const cleanSearch = s?.trim();
        const cleanSpecies = sp?.trim();
        const cleanSort = so?.trim();

        if (cleanSearch) params.set("search", cleanSearch);

        // IMPORTANT FIX: don't send empty string
        if (cleanSpecies) {
            params.set("species", cleanSpecies);
        }

        if (cleanSort && cleanSort !== "newest") {
            params.set("sort", cleanSort);
        } else {
            params.set("sort", "newest");
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    const handleSearch = () => {
        updateQueryParams(search, species, sort);
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="
                relative overflow-hidden
                rounded-3xl
                border border-green-100 dark:border-neutral-800
                bg-linear-to-br from-white via-green-50/40 to-white
                dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950
                shadow-xl
                p-6 md:p-8
                mb-10
            "
        >

            {/* HEADER */}
            <div className="flex items-center gap-2 mb-6">
                <PawPrint className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-bold text-green-900 dark:text-white">
                    Find Your Perfect Pet
                </h2>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* SEARCH */}
                <div className="flex flex-col gap-3">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        placeholder="Search pets..."
                        startContent={<Search className="w-4 h-4 text-green-600" />}
                        classNames={{
                            inputWrapper: `
                                h-14 rounded-2xl
                                bg-white dark:bg-neutral-900
                                border border-green-100 dark:border-neutral-800
                            `,
                            input: "font-medium text-sm"
                        }}
                    />

                    <button
                        onClick={handleSearch}
                        className="
                            h-12 rounded-2xl
                            bg-green-600 hover:bg-green-700
                            text-white font-semibold
                            flex items-center justify-center gap-2
                            transition
                        "
                    >
                        <Search className="w-4 h-4" />
                        Search
                    </button>
                </div>

                {/* SPECIES DROPDOWN (UPDATED) */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-500">
                        Species
                    </label>

                    <Dropdown>
                        <Button
                            aria-label="Species dropdown"
                            variant="secondary"
                            className="
                                h-14 rounded-2xl
                                w-full justify-start
                                bg-white dark:bg-neutral-900
                                border border-green-100 dark:border-neutral-800
                                font-medium
                            "
                        >
                            <PawPrint className="w-4 h-4 mr-2 text-green-600" />
                            {species || "Select species"}
                        </Button>

                        <Dropdown.Popover>
                            <Dropdown.Menu
                                onAction={(key) => {
                                    const value = key || "";
                                    setSpecies(value);
                                    updateQueryParams(search, value, sort);
                                }}
                            >
                                <Dropdown.Item id="Dog">
                                    <Label>Dogs</Label>
                                </Dropdown.Item>

                                <Dropdown.Item id="Cat">
                                    <Label>Cats</Label>
                                </Dropdown.Item>

                                <Dropdown.Item id="Bird">
                                    <Label>Birds</Label>
                                </Dropdown.Item>

                                <Dropdown.Item id="Rabbit">
                                    <Label>Rabbits</Label>
                                </Dropdown.Item>

                                <Dropdown.Item id="">
                                    <Label>All Species</Label>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                </div>

                {/* SORT DROPDOWN */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-500">
                        Sort
                    </label>

                    <Dropdown>
                        <Button
                            aria-label="Sort dropdown"
                            variant="secondary"
                            className="
                h-14 w-full justify-start
                rounded-2xl
                bg-white dark:bg-neutral-900
                border border-green-100 dark:border-neutral-800
                font-medium
            "
                        >
                            <ArrowUpDown className="w-4 h-4 mr-2 text-green-600" />
                            {sort === "newest" && "Newest Added"}
                            {sort === "oldest" && "Oldest Added"}
                            {sort === "name-asc" && "Name: A → Z"}
                            {sort === "name-desc" && "Name: Z → A"}
                        </Button>

                        <Dropdown.Popover>
                            <Dropdown.Menu
                                onAction={(key) => {
                                    const value = key || "newest";
                                    setSort(value);
                                    updateQueryParams(search, species, value);
                                }}
                            >
                                <Dropdown.Item id="newest">
                                    <Label>Newest Added</Label>
                                </Dropdown.Item>

                                <Dropdown.Item id="oldest">
                                    <Label>Oldest Added</Label>
                                </Dropdown.Item>

                                <Dropdown.Item id="name-asc">
                                    <Label>Name: A → Z</Label>
                                </Dropdown.Item>

                                <Dropdown.Item id="name-desc">
                                    <Label>Name: Z → A</Label>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                </div>

            </div>
        </motion.section>
    );
}