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
        // console.log(tokenData);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption/pet/${pet._id}`, {
                headers: {
                    authorization: `Bearer ${tokenData?.token}`
                }
            });
            if (!res.ok) {
                return (
            <section className="py-16 text-center text-gray-500">
                Pets temporarily unavailable
            </section>
        );
            }
            const data = await res.json();
            setRequests(data);
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        const { data: tokenData } = await authClient.token();
        // console.log(tokenData);

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
        // console.log(tokenData);

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
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>

            <Button
                size="sm"
                variant="primary"
                className="w-full font-bold rounded-xl"
                onPress={loadRequests}
            >
                Requests {pet.requestCount > 0 && `(${pet.requestCount})`}
            </Button>

            <Modal.Backdrop className="bg-black/60 backdrop-blur-sm z-50">
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[460px] bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-2">
                        <Modal.CloseTrigger className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200" />

                        <Modal.Header className="flex flex-col gap-1 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                            <span className="text-[10px] uppercase font-extrabold tracking-widest text-primary">
                                Incoming Applications
                            </span>
                            <Modal.Heading className="text-xl font-black text-neutral-900 dark:text-white">
                                Requests for {pet.petName}
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="py-4 max-h-[380px] overflow-y-auto space-y-4">
                            {loading ? (
                                <p className="text-center text-sm text-neutral-400 py-6 font-medium animate-pulse">
                                    Fetching adoption ledger...
                                </p>
                            ) : requests.length === 0 ? (
                                <div className="text-center py-10 bg-neutral-50 dark:bg-neutral-900/40 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
                                    <p className="text-sm font-semibold text-neutral-400">No active requests for this pet.</p>
                                </div>
                            ) : (
                                requests.map((r) => (
                                    <div
                                        key={r._id}
                                        className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-3"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-neutral-800 dark:text-neutral-100 text-base leading-tight">
                                                    {r.adopterName}
                                                </h4>
                                                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                                                    {r.adopterEmail}
                                                </p>
                                            </div>
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/30">
                                                {r.status || 'Pending'}
                                            </span>
                                        </div>

                                        <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5">
                                            <span>📅 Target Pickup:</span>
                                            <span className="font-bold text-neutral-700 dark:text-neutral-300">
                                                {r.pickupDate ? new Date(r.pickupDate).toLocaleDateString() : 'Unspecified'}
                                            </span>
                                        </div>

                                        <div className="text-xs text-neutral-600 dark:text-neutral-300 italic bg-white dark:bg-neutral-900 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 leading-relaxed">
                                            {`${r.message} || "No contextual pitch message provided."`}
                                        </div>


                                        <div className="flex gap-2 mt-2">
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

                        <Modal.Footer className="border-t border-neutral-100 dark:border-neutral-800 pt-3 flex justify-end">
                            <Button
                                size="sm"
                                variant="outline"
                                className="font-bold rounded-xl px-5"
                                onPress={() => setIsOpen(false)}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default RequestsModal;