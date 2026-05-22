"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { motion } from "framer-motion";

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

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-white dark:text-neutral-100"
            initial="hidden"
            animate="show"
            variants={containerVariants}
        >

            {/* STATS CARDS */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
                variants={containerVariants}
            >

                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    className="p-5 rounded-2xl border border-gray-500 dark:border-gray-300 shadow-sm">
                    <p className="text-3xl font-bold text-black dark:text-white">{stats.total}</p>
                    <p className="text-sm text-black dark:text-white">Total Requests</p>
                </motion.div>


                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    className="p-5 rounded-2xl border border-yellow-200 dark:border-yellow-900/30 bg-yellow-50/50 dark:bg-yellow-950/20 shadow-sm">
                    <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">{stats.pending}</p>
                    <p className="text-sm text-yellow-700/80 dark:text-yellow-500/80">Pending</p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    className="p-5 rounded-2xl border border-green-200 dark:border-green-900/30 bg-green-50/50 dark:bg-green-950/20 shadow-sm">
                    <p className="text-3xl font-bold text-green-600 dark:text-green-500">{stats.approved}</p>
                    <p className="text-sm text-green-700/80 dark:text-green-400/80">Approved</p>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    className="p-5 rounded-2xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/20 shadow-sm">
                    <p className="text-3xl font-bold text-red-600 dark:text-red-500">{stats.rejected}</p>
                    <p className="text-sm text-red-700/80 dark:text-red-400/80">Rejected</p>
                </motion.div>

            </motion.div>

            {
                myRequests.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-linear-to-br from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900"
                    >
                        <div className="text-6xl mb-4">🐾</div>

                        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">
                            No Adoption Requests Yet
                        </h2>

                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md">
                            You haven’t made any adoption requests yet.
                            Once you do, they will appear here.
                        </p>

                        <Link href="/all-pets">
                            <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white rounded-xl px-6">
                                Browse Pets
                            </Button>
                        </Link>
                    </motion.div>
                )
            }

            {
                myRequests.length > 0 && (
                    <div className="lg:hidden space-y-4">
                        {myRequests.map((request, index) => (
                            <motion.div
                                key={request._id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                                className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2 shadow-sm"
                            >
                                <p className="font-bold text-black dark:text-white">
                                    {request.petName}
                                </p>

                                <p className="text-sm text-neutral-900 dark:text-white">
                                    Request: {new Date(request.createdAt).toLocaleDateString()}
                                </p>

                                <p className="text-sm text-neutral-900 dark:text-white">
                                    Pickup: {new Date(request.pickupDate).toLocaleDateString()}
                                </p>

                                <span className={`text-xs px-2 py-1 rounded-full border inline-block ${request.status === "approved"
                                    ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-500 dark:text-green-100 dark:border-green-100 dark:font-bold"
                                    : request.status === "rejected"
                                        ? "bg-red-100 text-red-600 border-red-200 dark:bg-red-500 dark:text-red-100 dark:border-red-100 dark:font-bold"
                                        : "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500 dark:text-yellow-100 dark:border-yellow-100 dark:font-bold"
                                    }`}>
                                    {request.status}
                                </span>

                                <div className="flex gap-2 pt-2">
                                    <Button size="sm" variant="outline">
                                        View
                                    </Button>

                                    {request.status?.toLowerCase() === "pending" && (
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onPress={() => handleCancel(request._id)}
                                        >
                                            Cancel
                                        </Button>
                                    )}

                                    {["approved", "rejected", "cancelled"].includes(
                                        request.status?.toLowerCase()
                                    ) && (
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onPress={() => handleCancel(request._id)}
                                            >
                                                Delete
                                            </Button>
                                        )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )
            }
            {
                myRequests.length > 0 && (
                    <div className="hidden lg:block border border-black dark:border-white text-sm text-black dark:text-neutral-200 rounded-2xl overflow-hidden shadow-sm">

                        {/* TABLE HEADER */}
                        <div className="grid grid-cols-5 px-6 py-4 border-b border-black dark:border-white font-semibold">
                            <p className="text-center">Pet</p>
                            <p className="text-center">Request Date</p>
                            <p className="text-center">Pickup Date</p>
                            <p className="text-center">Status</p>
                            <p className="text-center">Actions</p>
                        </div>

                        {/* TABLE ROWS */}
                        {myRequests.map((request, index) => (
                            <motion.div
                                key={request._id}
                                variants={itemVariants}
                                initial="hidden"
                                animate="show"
                                transition={{ delay: index * 0.03 }}
                                className="grid grid-cols-5 px-6 py-4 border-t border-black dark:white items-center text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                <p className="font-medium text-black dark:text-white ">{request.petName}</p>

                                <p className="text-black dark:text-white flex justify-center items-center">
                                    {new Date(request.createdAt).toLocaleDateString()}
                                </p>

                                <p className="text-black dark:text-white flex justify-center items-center">
                                    {new Date(request.pickupDate).toLocaleDateString()}
                                </p>

                                <div className="flex justify-center items-center">
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

                                <div className="flex justify-center items-center gap-2">
                                    <Link href={`#`}>
                                        <Button size="sm" variant="outline" className="border-black dark:border-white hover:bg-gray-200 dark:hover:bg-gray-700
                                hover:text-white dark:hover:text-black text-black dark:text-white font-medium">
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
                            </motion.div>
                        ))}
                    </div>
                )
            }

        </motion.div>
    );
}