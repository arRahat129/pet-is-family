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

            ownerId: petDetails.ownerId,
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
            console.log(data);
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
        </form>
    );
}