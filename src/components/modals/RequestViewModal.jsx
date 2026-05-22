"use client";

import Image from "next/image";
import { Button, Modal } from "@heroui/react";
import { Rocket } from "@gravity-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

export default function RequestViewModal({ request }) {

    const status = request.status?.toLowerCase();

    if (!request) return null;

    return (
        <AnimatePresence>
            <Modal>
                <Button
                    size="sm"
                    variant="outline"
                    className="border-black dark:border-white hover:bg-gray-200 dark:hover:bg-gray-700
                hover:text-white dark:hover:text-black text-black dark:text-white font-medium"
                >
                    View
                </Button>

                <Modal.Backdrop>
                    <Modal.Container>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            <Modal.Dialog className="sm:max-w-130 rounded-3xl overflow-hidden">

                                <Modal.CloseTrigger />

                                <Modal.Header className="pb-2">
                                    <Modal.Icon className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                                        <Rocket className="size-5" />
                                    </Modal.Icon>

                                    <div>
                                        <Modal.Heading className="text-xl font-bold">
                                            Adoption Request
                                        </Modal.Heading>

                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                                            Review your submitted request details
                                        </p>
                                    </div>
                                </Modal.Header>

                                <Modal.Body className="space-y-5">

                                    <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                                        <Image
                                            src={request.petImage}
                                            alt={request.petName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="space-y-3">

                                        <div className="flex items-center justify-between gap-3">
                                            <h2 className="text-2xl font-bold text-black dark:text-white">
                                                {request.petName}
                                            </h2>

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize
                                        ${status === "approved"
                                                        ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"

                                                        : status === "rejected"
                                                            ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"

                                                            : status === "cancelled"
                                                                ? "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"

                                                                : "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800"
                                                    }`}
                                            >
                                                {request.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                            <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                    Owner
                                                </p>

                                                <p className="font-semibold text-black dark:text-white">
                                                    {request.ownerName}
                                                </p>
                                            </div>

                                            <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                    Pickup Date
                                                </p>

                                                <p className="font-semibold text-black dark:text-white">
                                                    {new Date(request.pickupDate).toLocaleDateString()}
                                                </p>
                                            </div>

                                            <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                    Requested On
                                                </p>

                                                <p className="font-semibold text-black dark:text-white">
                                                    {new Date(request.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>

                                            <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                    Your Email
                                                </p>

                                                <p className="font-semibold text-black dark:text-white break-all">
                                                    {request.adopterEmail}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                                                Your Message
                                            </p>

                                            <p className="text-sm leading-relaxed text-black dark:text-neutral-200">
                                                {request.message || "No message provided."}
                                            </p>
                                        </div>

                                    </div>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button
                                        slot="close"
                                        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
                                    >
                                        Close
                                    </Button>
                                </Modal.Footer>

                            </Modal.Dialog>
                        </motion.div>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </AnimatePresence>
    );
}