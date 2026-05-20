import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@heroui/react";
import Link from "next/link";

const Dashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const petRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pet/owner/${user.id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    if (!petRes.ok) {
        console.log("PET API ERROR:", await petRes.text());
        return;
    }

    const pets = await petRes.json();

    const totalPets = pets.length;
    const adoptedPets = pets.filter(p => p.adoptionStatus?.toLowerCase() === "adopted").length;
    const availablePets = pets.filter(p => p.adoptionStatus?.toLowerCase() === "available").length;

    const reqRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption/adopter/${user.id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const requests = await reqRes.json();

    const totalReq = requests.length;
    const pendingReq = requests.filter(r => r.status?.toLowerCase() === "pending").length;
    const approvedReq = requests.filter(r => r.status?.toLowerCase() === "approved").length;
    const rejectedReq = requests.filter(r => r.status?.toLowerCase() === "rejected").length;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">

            <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Dashboard
                </h1>
                <p className="text-gray-500 mt-2">
                    Overview of your pets and adoption activity
                </p>
            </div>

            <section>
                <h2 className="text-xl font-bold mb-4">🐾 My Pets</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                    <div className="p-6 rounded-2xl border bg-white shadow-sm">
                        <p className="text-3xl font-bold">{totalPets}</p>
                        <p className="text-sm text-gray-500">Total Pets</p>
                    </div>

                    <div className="p-6 rounded-2xl border bg-green-50">
                        <p className="text-3xl font-bold text-green-600">{availablePets}</p>
                        <p className="text-sm text-gray-500">Available</p>
                    </div>

                    <div className="p-6 rounded-2xl border bg-blue-50">
                        <p className="text-3xl font-bold text-blue-600">{adoptedPets}</p>
                        <p className="text-sm text-gray-500">Adopted</p>
                    </div>

                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4">📋 My Requests</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="p-5 rounded-2xl border bg-white shadow-sm">
                        <p className="text-2xl font-bold">{totalReq}</p>
                        <p className="text-sm text-gray-500">Total</p>
                    </div>

                    <div className="p-5 rounded-2xl border bg-yellow-50">
                        <p className="text-2xl font-bold text-yellow-600">{pendingReq}</p>
                        <p className="text-sm text-gray-500">Pending</p>
                    </div>

                    <div className="p-5 rounded-2xl border bg-green-50">
                        <p className="text-2xl font-bold text-green-600">{approvedReq}</p>
                        <p className="text-sm text-gray-500">Approved</p>
                    </div>

                    <div className="p-5 rounded-2xl border bg-red-50">
                        <p className="text-2xl font-bold text-red-600">{rejectedReq}</p>
                        <p className="text-sm text-gray-500">Rejected</p>
                    </div>

                </div>
            </section>

            <section className="flex gap-3 flex-wrap">

                <Link href="/listings">
                    <Button variant="outline">Browse Pets</Button>
                </Link>

                <Link href="/add-pet">
                    <Button variant="outline">Add Pet</Button>
                </Link>

                <Link href="/my-requests">
                    <Button variant="outline">View Requests</Button>
                </Link>

            </section>

        </div>
    );
};

export default Dashboard;