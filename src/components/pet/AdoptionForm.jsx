"use client";

import { useState } from "react";
import { Button, Card, Input, TextArea } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AdoptionPanel({ petDetails }) {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    // console.log({ user, petDetails });

    const [loading, setLoading] = useState(false);

    const handleAdopt = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData(e.currentTarget);

        const payload = {
            petId: petDetails._id,
            petName: petDetails.petName,

            ownerId: petDetails.userId,
            ownerEmail: petDetails.ownerEmail,

            adopterId: user?.id,
            adopterName: user?.name,
            adopterEmail: user?.email,

            pickupDate: form.get("pickupDate"),
            message: form.get("message"),

            status: "pending",
            createdAt: new Date(),
        };

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await res.json();
            toast.success(`Successfully Requested to adopt ${petDetails.petName}`)
            // console.log(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleAdopt}
            className="space-y-4 bg-white p-5 rounded-xl border"
        >
            <h2 className="text-lg font-semibold text-green-900">
                Request to Adopt
            </h2>
            {
                user?.id === petDetails.userId
                    ? <>
                        <Card className="p-6 border border-amber-200 bg-linear-to-br from-amber-50 to-orange-50 shadow-none rounded-xl text-center space-y-3">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                                </svg>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-base font-bold text-amber-900">
                                    Your Personal Listing
                                </h3>
                                <p className="text-xs text-amber-700 max-w-xs mx-auto leading-relaxed">
                                    You are currently viewing a pet profile you created. Adoption forms are locked down for owners.
                                </p>
                            </div>
                            <div className="pt-1">
                                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold tracking-wide uppercase">
                                    Owner View Mode
                                </div>
                            </div>
                        </Card>
                    </>
                    : <>
                        <label className="text-sm">Pet Name</label>
                        <Input value={petDetails.petName} label="Pet Name" readOnly className={'w-full'} />

                        <label className="text-sm">Owner Name</label>
                        <Input value={user?.name || ""} label="Your Name" readOnly className={'w-full'} />

                        <label className="text-sm">Owner Email</label>
                        <Input value={user?.email || ""} label="Your Email" readOnly className={'w-full'} />

                        <label className="text-sm">Preffered PickUp Day</label>
                        <Input
                            name="pickupDate"
                            type="date"
                            label="Pickup Date"
                            required
                            className={'w-full'}
                        />

                        <label className="text-sm">Text To Owner</label>
                        <TextArea
                            name="message"
                            label="Message to Owner"
                            placeholder="Why are you a good match?"
                            required
                            className={'w-full'}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-green-600 text-white"
                            isDisabled={loading}
                        >
                            {loading ? "Sending..." : "Adopt Pet"}
                        </Button>
                    </>
            }
        </form>
    );
}