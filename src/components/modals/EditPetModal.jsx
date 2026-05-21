"use client";

import React, { useState } from "react";
import {
    Button,
    Label,
    ListBox,
    Modal,
    TextArea,
    TextField,
    Select,
    Input
} from "@heroui/react";

import { FolderPlus } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const EditPetModal = ({ pet }) => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [form, setForm] = useState({
        petName: pet.petName || "",
        species: pet.species || "",
        breed: pet.breed || "",
        age: pet.age || "",
        gender: pet.gender || "",
        imageUrl: pet.imageUrl || "",
        healthStatus: pet.healthStatus || "",
        vaccinationStatus: pet.vaccinationStatus || "",
        location: pet.location || "",
        adoptionFee: pet.adoptionFee || "",
        description: pet.description || "",
    });

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorMessage("");

        try {
            const payload = {
                ...form,
                age: Number(form.age),
                adoptionFee: Number(form.adoptionFee),
            };

            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/pet/${pet._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${tokenData?.token}`
                    },
                    body: JSON.stringify(payload)
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || "Failed to update pet");
            }

            if (data.modifiedCount > 0) {
                toast.success("Pet updated successfully");
            } else {
                toast.success("No changes detected");
            }

            router.refresh();
            setIsOpen(false);

        } catch (error) {
            toast.error(error.message || "Error occurred");
            setErrorMessage(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button
                size="sm"
                variant="secondary"
                className="w-full rounded-xl"
                onPress={() => {
                    setErrorMessage("");
                    setIsOpen(true);
                }}
            >
                <FolderPlus className="size-4" />
                Edit
            </Button>

            <Modal.Backdrop className="bg-black/40 dark:bg-black/80">
                <Modal.Container>
                    <Modal.Dialog className="
                        sm:max-w-3xl rounded-3xl
                        bg-white dark:bg-black
                        border border-black dark:border-white
                    ">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Icon className="text-black dark:text-white">
                                <FolderPlus className="size-5" />
                            </Modal.Icon>

                            <Modal.Heading className="text-black dark:text-white">
                                Edit Pet
                            </Modal.Heading>

                            <p className="text-sm text-black dark:text-white">
                                Update pet information
                            </p>
                        </Modal.Header>

                        <Modal.Body>
                            <form onSubmit={onSubmit} className="space-y-5">

                                {errorMessage && (
                                    <div className="p-3 rounded-xl border border-black text-black dark:text-white">
                                        {errorMessage}
                                    </div>
                                )}

                                {/* Pet Name */}
                                <TextField>
                                    <Label>Pet Name</Label>
                                    <Input
                                        value={form.petName}
                                        onChange={(e) =>
                                            handleChange("petName", e.target.value)
                                        }
                                        className="w-full bg-white text-black border"
                                    />
                                </TextField>

                                {/* Species */}
                                <div>
                                    <Label>Species</Label>
                                    <Select
                                        selectedKeys={form.species ? new Set([form.species]) : new Set()}
                                        onSelectionChange={(key) =>
                                            handleChange("species", String(key ?? ""))
                                        }
                                    >
                                        <Select.Trigger className="w-full bg-white text-black border">
                                            <Select.Value />
                                        </Select.Trigger>

                                        <Select.Popover>
                                            <ListBox>
                                                <ListBox.Item id="Dog">Dog</ListBox.Item>
                                                <ListBox.Item id="Cat">Cat</ListBox.Item>
                                                <ListBox.Item id="Bird">Bird</ListBox.Item>
                                                <ListBox.Item id="Rabbit">Rabbit</ListBox.Item>
                                                <ListBox.Item id="Other">Other</ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>

                                {/* Breed */}
                                <TextField>
                                    <Label>Breed</Label>
                                    <Input
                                        value={form.breed}
                                        onChange={(e) =>
                                            handleChange("breed", e.target.value)
                                        }
                                    />
                                </TextField>

                                {/* Age */}
                                <TextField>
                                    <Label>Age</Label>
                                    <Input
                                        type="number"
                                        value={form.age}
                                        onChange={(e) =>
                                            handleChange("age", e.target.value)
                                        }
                                    />
                                </TextField>

                                {/* Gender */}
                                <div>
                                    <Label>Gender</Label>
                                    <Select
                                        selectedKeys={form.gender ? new Set([form.gender]) : new Set()}
                                        onSelectionChange={(key) =>
                                            handleChange("gender", String(key ?? ""))
                                        }
                                    >
                                        <Select.Trigger className="w-full bg-white text-black border">
                                            <Select.Value />
                                        </Select.Trigger>

                                        <Select.Popover>
                                            <ListBox>
                                                <ListBox.Item id="Male">Male</ListBox.Item>
                                                <ListBox.Item id="Female">Female</ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>

                                {/* Image */}
                                <TextField>
                                    <Label>Image</Label>
                                    <Input
                                        value={form.imageUrl}
                                        onChange={(e) =>
                                            handleChange("imageUrl", e.target.value)
                                        }
                                    />
                                </TextField>

                                {/* Health */}
                                <TextField>
                                    <Label>Health</Label>
                                    <Input
                                        value={form.healthStatus}
                                        onChange={(e) =>
                                            handleChange("healthStatus", e.target.value)
                                        }
                                    />
                                </TextField>

                                {/* Vaccination */}
                                <TextField>
                                    <Label>Vaccination</Label>
                                    <Input
                                        value={form.vaccinationStatus}
                                        onChange={(e) =>
                                            handleChange("vaccinationStatus", e.target.value)
                                        }
                                    />
                                </TextField>

                                {/* Location */}
                                <TextField>
                                    <Label>Location</Label>
                                    <Input
                                        value={form.location}
                                        onChange={(e) =>
                                            handleChange("location", e.target.value)
                                        }
                                    />
                                </TextField>

                                {/* Fee */}
                                <TextField>
                                    <Label>Adoption Fee</Label>
                                    <Input
                                        type="number"
                                        value={form.adoptionFee}
                                        onChange={(e) =>
                                            handleChange("adoptionFee", e.target.value)
                                        }
                                    />
                                </TextField>

                                {/* Description */}
                                <TextField>
                                    <Label>Description</Label>
                                    <TextArea
                                        value={form.description}
                                        onChange={(e) =>
                                            handleChange("description", e.target.value)
                                        }
                                    />
                                </TextField>

                                {/* Actions */}
                                <div className="flex gap-3 justify-end">
                                    <Button variant="secondary" slot="close">
                                        Cancel
                                    </Button>

                                    <Button type="submit" isDisabled={isLoading}>
                                        {isLoading ? "Saving..." : "Save"}
                                    </Button>
                                </div>

                            </form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditPetModal;