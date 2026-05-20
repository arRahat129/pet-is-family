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
        // console.log(tokenData);
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

            if (!res.ok) throw new Error("Failed to cancel request");

            toast.success("Request cancelled");

            router.refresh();

        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

                <div className="p-5 rounded-2xl border bg-white">
                    <p className="text-3xl font-bold">{stats.total}</p>
                    <p className="text-sm text-gray-500">Total Requests</p>
                </div>

                <div className="p-5 rounded-2xl border bg-yellow-50">
                    <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                    <p className="text-sm text-gray-500">Pending</p>
                </div>

                <div className="p-5 rounded-2xl border bg-green-50">
                    <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                    <p className="text-sm text-gray-500">Approved</p>
                </div>

                <div className="p-5 rounded-2xl border bg-red-50">
                    <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                    <p className="text-sm text-gray-500">Rejected</p>
                </div>

            </div>

            <div className="hidden md:block border rounded-2xl overflow-hidden bg-white">

                <div className="grid grid-cols-5 px-6 py-4 bg-gray-50 font-semibold text-sm">
                    <p>Pet</p>
                    <p>Request Date</p>
                    <p>Pickup Date</p>
                    <p>Status</p>
                    <p className="text-right">Actions</p>
                </div>

                {myRequests.map((request) => (
                    <div
                        key={request._id}
                        className="grid grid-cols-5 px-6 py-4 border-t items-center"
                    >

                        <p className="font-medium">{request.petName}</p>

                        <p className="text-sm text-gray-600">
                            {new Date(request.createdAt).toLocaleDateString()}
                        </p>

                        <p className="text-sm text-gray-600">
                            {new Date(request.pickupDate).toLocaleDateString()}
                        </p>

                        <p>
                            <span
                                className={`px-3 py-1 text-xs rounded-full font-semibold ${request.status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : request.status === "rejected"
                                        ? "bg-red-100 text-red-600"
                                        : request.status === "cancelled"
                                            ? "bg-gray-200 text-gray-600"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {request.status}
                            </span>
                        </p>

                        <div className="flex justify-end gap-2">

                            <Link href={`/pets/${request.petId}`}>
                                <Button size="sm" variant="outline">
                                    View
                                </Button>
                            </Link>

                            {request.status?.toLowerCase() === "pending" && (
                                <Button
                                    size='sm'
                                    variant='danger'
                                    onPress={() => handleCancel(request._id)}
                                >
                                    ✕ Cancel
                                </Button>
                            )}

                            {["approved", "rejected", "cancelled"].includes(
                                request.status?.toLowerCase()
                            ) && (
                                    <Button
                                        size='sm'
                                        variant="danger"
                                        onPress={() => handleCancel(request._id)}
                                    >
                                        <TrashBin /> Delete
                                    </Button>
                                )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}