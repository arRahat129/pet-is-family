"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";

export default function MyRequestsClient({ myRequests, stats }) {
    const router = useRouter();

    const handleCancel = async (id) => {
        const { data: tokenData } = await authClient.token();
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${tokenData?.token}`
                    },
                }
            );

            if (!res.ok) {
                toast.error("Failed to process request action");
                return;
            }

            toast.success("Request cancelled");
            router.refresh();

        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-white dark:text-neutral-100">

            {/* STATS CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

                <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                    <p className="text-3xl font-bold text-white dark:text-white">{stats.total}</p>
                    <p className="text-sm text-white dark:text-neutral-400">Total Requests</p>
                </div>

                <div className="p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900/30 bg-yellow-50/50 dark:bg-yellow-950/20 shadow-sm">
                    <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">{stats.pending}</p>
                    <p className="text-sm text-yellow-700/80 dark:text-yellow-500/80">Pending</p>
                </div>

                <div className="p-5 rounded-2xl border border-green-200 dark:border-green-900/30 bg-green-50/50 dark:bg-green-950/20 shadow-sm">
                    <p className="text-3xl font-bold text-green-600 dark:text-green-500">{stats.approved}</p>
                    <p className="text-sm text-green-700/80 dark:text-green-400/80">Approved</p>
                </div>

                <div className="p-5 rounded-2xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20 shadow-sm">
                    <p className="text-3xl font-bold text-red-600 dark:text-red-500">{stats.rejected}</p>
                    <p className="text-sm text-red-700/80 dark:text-red-400/80">Rejected</p>
                </div>

            </div>

            {/* DATA TABLE CONTAINER */}
            <div className="hidden md:block border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden bg-white dark:bg-neutral-950 shadow-sm">

                {/* TABLE HEADER */}
                <div className="grid grid-cols-5 px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 font-semibold text-sm text-white dark:text-neutral-200">
                    <p>Pet</p>
                    <p>Request Date</p>
                    <p>Pickup Date</p>
                    <p>Status</p>
                    <p className="text-right">Actions</p>
                </div>

                {/* TABLE ROWS */}
                {myRequests.map((request) => (
                    <div
                        key={request._id}
                        className="grid grid-cols-5 px-6 py-4 border-t border-neutral-200 dark:border-neutral-800/60 items-center text-sm hover:bg-neutral-50/60 dark:hover:bg-neutral-900/40 transition-colors text-white dark:text-neutral-300"
                    >
                        <p className="font-medium text-white dark:text-white">{request.petName}</p>

                        <p className="text-white dark:text-neutral-400">
                            {new Date(request.createdAt).toLocaleDateString()}
                        </p>

                        <p className="text-white dark:text-neutral-400">
                            {new Date(request.pickupDate).toLocaleDateString()}
                        </p>

                        <div>
                            <span
                                className={`px-3 py-1 text-xs rounded-full font-semibold border ${request.status === "approved"
                                        ? "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/50"
                                        : request.status === "rejected"
                                            ? "bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50"
                                            : request.status === "cancelled"
                                                ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700"
                                                : "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/50"
                                    }`}
                            >
                                {request.status}
                            </span>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Link href={`#`}>
                                <Button size="sm" variant="outline" className="border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium">
                                    View
                                </Button>
                            </Link>

                            {request.status?.toLowerCase() === "pending" && (
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onPress={() => handleCancel(request._id)}
                                    className="font-medium"
                                >
                                    ✕ Cancel
                                </Button>
                            )}

                            {["approved", "rejected", "cancelled"].includes(
                                request.status?.toLowerCase()
                            ) && (
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onPress={() => handleCancel(request._id)}
                                        className="font-medium flex items-center gap-1"
                                    >
                                        <TrashBin className="w-4 h-4" /> Delete
                                    </Button>
                                )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}