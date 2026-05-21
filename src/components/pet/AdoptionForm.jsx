"use client";

import { useState } from "react";
import { Button, Card, Input, TextArea } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AdoptionPanel({ petDetails }) {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [loading, setLoading] = useState(false);

    if (petDetails.adoptionStatus === "adopted") {
        return (
            <Card className="p-6 text-center border rounded-xl bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300">
                This pet has already been adopted.
            </Card>
        );
    }

    const handleAdopt = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!user) {
            router.push('/signin');
            return;
        }

        const form = new FormData(e.currentTarget);

        const payload = {
            petId: petDetails._id,
            petName: petDetails.petName,
            petImage: petDetails.imageUrl,
            ownerId: petDetails.userId,
            ownerName: petDetails.ownerName,
            ownerEmail: petDetails.ownerEmail,
            adopterId: user?.id,
            adopterName: user?.name,
            adopterImage: user?.image,
            adopterEmail: user?.email,
            pickupDate: form.get("pickupDate"),
            message: form.get("message"),
            status: "pending",
            createdAt: new Date(),
        };

        const { data: tokenData } = await authClient.token();

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${tokenData?.token}`
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) return;

            await res.json();
            toast.success(`Successfully Requested to adopt ${petDetails.petName}`);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4 bg-white dark:bg-neutral-950 p-5 rounded-xl border dark:border-neutral-800"
            onSubmit={handleAdopt}
        >
            <h2 className="text-lg font-semibold text-green-900 dark:text-green-400">
                Request to Adopt
            </h2>

            {user?.id && petDetails.userId && user.id === petDetails.userId ? (
                <Card className="p-6 border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 rounded-xl text-center">
                    <h3 className="text-amber-900 dark:text-amber-300 font-bold">
                        Your Personal Listing
                    </h3>
                </Card>
            ) : (
                <>
                    <label className="text-sm dark:text-gray-300">Pet Name</label>
                    <Input value={petDetails.petName} readOnly />

                    <label className="text-sm dark:text-gray-300">Owner Name</label>
                    <Input value={user?.name || ""} readOnly />

                    <label className="text-sm dark:text-gray-300">Owner Email</label>
                    <Input value={user?.email || ""} readOnly />

                    <label className="text-sm dark:text-gray-300">Pickup Date</label>
                    <Input name="pickupDate" type="date" required />

                    <label className="text-sm dark:text-gray-300">Message</label>
                    <TextArea name="message" required />

                    <Button
                        type="submit"
                        className="w-full bg-green-600 text-white"
                        isDisabled={loading}
                    >
                        {loading ? "Sending..." : "Adopt Pet"}
                    </Button>
                </>
            )}
        </form>
    );
}