'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Modal } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const RequestsModal = ({ pet }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadRequests = async () => {
        setIsOpen(true);
        setLoading(true);

        const { data: tokenData } = await authClient.token();

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption/pet/${pet._id}`,
                {
                    headers: {
                        authorization: `Bearer ${tokenData?.token}`
                    }
                }
            );

            const data = await res.json();
            setRequests(data || []);
        } catch (error) {
            toast.error(error?.message || "Error");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        const { data: tokenData } = await authClient.token();

        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption/${id}/approve`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${tokenData?.token}`
            },
        });

        toast.success("Request approved");
        loadRequests();
        router.refresh();
    };

    const handleReject = async (id) => {
        const { data: tokenData } = await authClient.token();

        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption/${id}/reject`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${tokenData?.token}`
            },
        });

        toast.success("Request rejected");
        loadRequests();
        router.refresh();
    };

    return (
        <>
            <Button
                size="sm"
                variant="primary"
                className="w-full font-bold rounded-xl"
                onPress={() => {
                    setIsOpen(true);
                    loadRequests();
                }}
            >
                Requests {pet.requestCount > 0 && `(${pet.requestCount})`}
            </Button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>

                <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">

                    <Modal.Container>

                        <Modal.Dialog className="sm:max-w-[460px] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl p-2">

                            <Modal.CloseTrigger className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />

                            <Modal.Header className="border-b border-gray-100 dark:border-gray-800">
                                <Modal.Heading className="text-gray-900 dark:text-white">
                                    Requests for {pet.petName}
                                </Modal.Heading>
                            </Modal.Header>

                            <Modal.Body className="py-4 max-h-[380px] overflow-y-auto space-y-4">

                                {loading ? (
                                    <p className="text-center text-sm text-gray-400 dark:text-gray-300 py-6">
                                        Loading...
                                    </p>
                                ) : requests.length === 0 ? (
                                    <p className="text-center text-sm text-gray-400 dark:text-gray-300">
                                        No requests found
                                    </p>
                                ) : (
                                    requests.map((r) => (
                                        <div
                                            key={r._id}
                                            className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 space-y-3"
                                        >
                                            <h4 className="font-bold text-gray-900 dark:text-white">
                                                {r.adopterName}
                                            </h4>

                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {r.adopterEmail}
                                            </p>

                                            <p className="text-xs text-gray-600 dark:text-gray-300">
                                                {r.message}
                                            </p>

                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    onPress={() => handleApprove(r._id)}
                                                    isDisabled={pet.adoptionStatus === "adopted"}
                                                >
                                                    Approve
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="danger"
                                                    onPress={() => handleReject(r._id)}
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}

                            </Modal.Body>

                            <Modal.Footer className="border-t border-gray-100 dark:border-gray-800">

                                <Button
                                    size="sm"
                                    variant="outline"
                                    slot="close"
                                >
                                    Close
                                </Button>

                            </Modal.Footer>

                        </Modal.Dialog>

                    </Modal.Container>

                </Modal.Backdrop>

            </Modal>
        </>
    );
};

export default RequestsModal;