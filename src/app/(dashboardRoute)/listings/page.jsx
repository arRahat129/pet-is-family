import DeletePetModal from '@/components/modals/DeletePetModal';
import EditPetModal from '@/components/modals/EditPetModal';
import RequestsModal from '@/components/modals/RequestsModal';
import MotionWrapper from '@/components/motion/MotionWrapper';
import { auth } from '@/lib/auth';
import { Button } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ListingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    const { token } = await auth.api.getToken({
        headers: await headers()
    });

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pet/owner/${user.id}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );

    if (!res.ok) {
        return (
            <section className="py-16 text-center text-green-800/70 dark:text-neutral-400 font-medium bg-white dark:bg-neutral-900 border border-green-200 dark:border-neutral-800 rounded-xl">
                Pets temporarily unavailable
            </section>
        );
    }

    const petOwner = await res.json();

    const total = petOwner.length;

    const adopted = petOwner.filter(
        p => p.adoptionStatus?.toLowerCase() === "adopted"
    ).length;

    const available = petOwner.filter(
        p => p.adoptionStatus?.toLowerCase() === "available"
    ).length;

    return (
        <div>

            <MotionWrapper>
                {/* HEADER */}
                <div className="mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white tracking-tight">
                        My Listings
                    </h1>
                    <p className="text-green-700/70 dark:text-neutral-400 mt-2 text-sm">
                        Manage your pets and adoption requests.
                    </p>
                </div>
            </MotionWrapper>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">

                <MotionWrapper>
                    <div className="p-5 rounded-2xl border border-green-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm">
                        <p className="text-3xl font-extrabold text-green-950 dark:text-white">
                            {total}
                        </p>
                        <p className="text-green-700/60 dark:text-neutral-400 text-xs font-semibold uppercase tracking-wider mt-1">
                            Total Listings
                        </p>
                    </div>
                </MotionWrapper>

                <MotionWrapper>
                    <div className="p-5 rounded-2xl border border-green-200 dark:border-emerald-900/30 bg-green-50/50 dark:bg-emerald-950/20 shadow-sm">
                        <p className="text-3xl font-extrabold text-green-600 dark:text-emerald-400">
                            {available}
                        </p>
                        <p className="text-green-700/70 dark:text-emerald-500/70 text-xs font-semibold uppercase tracking-wider mt-1">
                            Available
                        </p>
                    </div>
                </MotionWrapper>

                <MotionWrapper>
                    <div className="p-5 rounded-2xl border border-blue-200 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm">
                        <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                            {adopted}
                        </p>
                        <p className="text-blue-700/70 dark:text-blue-500/70 text-xs font-semibold uppercase tracking-wider mt-1">
                            Adopted
                        </p>
                    </div>
                </MotionWrapper>

            </div>

            {/* LISTINGS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {petOwner.map((pet, i) => (
                    <MotionWrapper key={pet._id} delay={i * 0.05}>
                        <div
                            className="border border-green-200 dark:border-neutral-800 rounded-3xl bg-white dark:bg-neutral-900/40 shadow-sm overflow-hidden hover:shadow-md transition duration-300 flex flex-col"
                        >
                            <div className="relative h-48 bg-green-50/20 dark:bg-neutral-800/50 border-b border-green-100 dark:border-neutral-800/50">
                                <Image
                                    src={pet.imageUrl}
                                    alt={pet.petName}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">

                                <div className="space-y-1.5">

                                    <div className="flex items-center justify-between gap-2">
                                        <h2 className="text-xl font-bold text-green-950 dark:text-white tracking-tight truncate">
                                            {pet.petName}
                                        </h2>

                                        <span
                                            className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${pet.adoptionStatus?.toLowerCase() === "adopted"
                                                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/40"
                                                : "bg-green-50 dark:bg-emerald-950/40 text-green-600 dark:text-emerald-400 border-green-200 dark:border-emerald-900/40"
                                                }`}
                                        >
                                            {pet.adoptionStatus}
                                        </span>
                                    </div>

                                    <p className="text-green-700/70 dark:text-neutral-400 text-sm font-medium">
                                        Adoption Fee:{" "}
                                        <span className="text-green-950 dark:text-neutral-200 font-semibold">
                                            ${pet.adoptionFee || 0}
                                        </span>
                                    </p>

                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-green-100 dark:border-neutral-800/60">

                                    <RequestsModal pet={pet} />

                                    <Link href={`/all-pets/${pet._id}`} className="w-full">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="w-full font-medium rounded-xl border-green-200 dark:border-neutral-700 text-green-800 dark:text-neutral-300 hover:bg-green-50 dark:hover:bg-neutral-800"
                                        >
                                            View
                                        </Button>
                                    </Link>

                                    <EditPetModal pet={pet} />

                                    <DeletePetModal pet={pet} />

                                </div>
                            </div>
                        </div>
                    </MotionWrapper>
                ))}

            </div>
        </div>
    );
};

export default ListingsPage;