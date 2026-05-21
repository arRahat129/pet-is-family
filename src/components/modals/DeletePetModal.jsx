"use client";

import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const DeletePetModal = ({ pet }) => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setIsLoading(true);

            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/pet/owner/${pet._id}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            toast.success("Pet deleted successfully");

            setIsOpen(false); 
            router.refresh();
            
        } catch (error) {
            setIsOpen(false); 
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>

            <Button
                size="sm"
                variant="danger"
                className="w-full font-semibold rounded-xl bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:text-red-400"
                onPress={() => setIsOpen(true)}
            >
                Delete
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">

                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>
                                Delete this pet <strong className="font-bold text-xl">({pet.petName})</strong> permanently?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                            This action cannot be undone.
                        </AlertDialog.Body>

                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>

                            <Button
                                variant="danger"
                                isDisabled={isLoading}
                                onPress={handleDelete}
                            >
                                {isLoading ? "Deleting..." : "Delete"}
                            </Button>
                        </AlertDialog.Footer>

                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>

        </AlertDialog>
    );
};

export default DeletePetModal;