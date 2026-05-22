import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button, Separator } from "@heroui/react";
import Link from "next/link";
import MotionDiv from "@/components/motion/MotionDiv";

const Dashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    if (!user) {
        return (
            <div className="p-10 text-center text-green-800 dark:text-neutral-400 font-medium">
                Please login to view dashboard
            </div>
        );
    }

    const { token } = await auth.api.getToken({
        headers: await headers()
    });

    const petRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pet/owner/${user.id}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            },
        }
    );

    if (!petRes.ok) {
        console.log("PET API ERROR:", await petRes.text());
        return null;
    }

    const pets = await petRes.json();

    const totalPets = pets.length;
    const adoptedPets = pets.filter(p => p.adoptionStatus?.toLowerCase() === "adopted").length;
    const availablePets = pets.filter(p => p.adoptionStatus?.toLowerCase() === "available").length;

    const reqRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption/adopter/${user.id}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );

    const requests = await reqRes.json();

    const totalReq = requests.length;
    const pendingReq = requests.filter(r => r.status?.toLowerCase() === "pending").length;
    const approvedReq = requests.filter(r => r.status?.toLowerCase() === "approved").length;
    const rejectedReq = requests.filter(r => r.status?.toLowerCase() === "rejected").length;

    return (
        <div className="space-y-10">

            {/* HEADER */}
            <MotionDiv>
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-white tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-green-700/70 dark:text-neutral-400 mt-2 text-sm">
                        Overview of your pets and adoption activity
                    </p>
                </div>

                {/* PETS */}
                <section>
                    <h2 className="text-xl font-bold mb-4 text-green-900 dark:text-white">🐾 My Pets</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                        <div className="p-6 rounded-2xl border border-green-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm">
                            <p className="text-3xl font-bold text-green-950 dark:text-white">{totalPets}</p>
                            <p className="text-sm text-green-700/70 dark:text-neutral-400 mt-0.5">Total Pets</p>
                        </div>

                        <div className="p-6 rounded-2xl border border-green-200 dark:border-green-900/30 bg-green-50/50 dark:bg-green-950/20 shadow-sm">
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{availablePets}</p>
                            <p className="text-sm text-green-700/70 dark:text-neutral-400 mt-0.5">Available</p>
                        </div>

                        <div className="p-6 rounded-2xl border border-blue-200 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm">
                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{adoptedPets}</p>
                            <p className="text-sm text-green-700/70 dark:text-neutral-400 mt-0.5">Adopted</p>
                        </div>

                    </div>
                </section>

                {/* REQUESTS */}
                <section>
                    <h2 className="text-xl font-bold mb-4 text-green-900 dark:text-white">📋 My Requests</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                        <div className="p-5 rounded-2xl border border-green-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm">
                            <p className="text-2xl font-bold text-green-950 dark:text-white">{totalReq}</p>
                            <p className="text-sm text-green-700/70 dark:text-neutral-400 mt-0.5">Total</p>
                        </div>

                        <div className="p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900/30 bg-yellow-50/50 dark:bg-yellow-950/20 shadow-sm">
                            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">{pendingReq}</p>
                            <p className="text-sm text-green-700/70 dark:text-neutral-400 mt-0.5">Pending</p>
                        </div>

                        <div className="p-5 rounded-2xl border border-green-200 dark:border-green-900/30 bg-green-50/50 dark:bg-emerald-950/20 shadow-sm">
                            <p className="text-2xl font-bold text-green-600 dark:text-emerald-400">{approvedReq}</p>
                            <p className="text-sm text-green-700/70 dark:text-neutral-400 mt-0.5">Approved</p>
                        </div>

                        <div className="p-5 rounded-2xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20 shadow-sm">
                            <p className="text-2xl font-bold text-red-600 dark:text-red-500">{rejectedReq}</p>
                            <p className="text-sm text-green-700/70 dark:text-neutral-400 mt-0.5">Rejected</p>
                        </div>

                    </div>
                </section>

                <div className="my-5 flex justify-center items-center gap-3 mx-auto w-1/3">

                    <Separator className="border-2 border-gray-700 dark:border-gray-100" />
                    <p className="whitespace-nowrap text-black dark:text-white">Browse Routes</p>
                    <Separator className="border-2 border-gray-700 dark:border-gray-100" />
                </div>

                {/* ACTIONS */}
                <section className="flex gap-3 flex-wrap">
                    <Link href="/listings">
                        <Button variant="outline" className="border-green-200 dark:border-neutral-700 text-green-800 dark:text-neutral-200 hover:bg-green-50 dark:hover:bg-neutral-800 rounded-xl font-medium">
                            Browse Pets
                        </Button>
                    </Link>

                    <Link href="/add-pet">
                        <Button variant="outline" className="border-green-200 dark:border-neutral-700 text-green-800 dark:text-neutral-200 hover:bg-green-50 dark:hover:bg-neutral-800 rounded-xl font-medium">
                            Add Pet
                        </Button>
                    </Link>

                    <Link href="/my-requests">
                        <Button variant="outline" className="border-green-200 dark:border-neutral-700 text-green-800 dark:text-neutral-200 hover:bg-green-50 dark:hover:bg-neutral-800 rounded-xl font-medium">
                            View Requests
                        </Button>
                    </Link>
                </section>
            </MotionDiv>
        </div>
    );
};

export default Dashboard;