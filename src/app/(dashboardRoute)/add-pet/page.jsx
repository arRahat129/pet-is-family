"use client";

import React, { useState } from "react";
import {
    Button,
    Card,
    Label,
    ListBox,
    Select,
    TextArea,
    TextField,
    Input,
} from "@heroui/react";

import { FolderPlus, TrashBin } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

const normalizeSpecies = (value) => {
    const map = {
        D: "Dog",
        C: "Cat",
        B: "Bird",
        R: "Rabbit",
        M: "Other",
    };
    return map[value] || value || "";
};

const normalizeGender = (value) => {
    const map = {
        M: "Male",
        F: "Female",
    };
    return map[value] || value || "";
};

const AddPetPage = () => {
    const [isPending, setIsPending] = useState(false);

    const { data: session, isPending: isSessionLoading } =
        authClient.useSession();

    const user = session?.user;

    const [form, setForm] = useState({
        petName: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        imageUrl: "",
        healthStatus: "",
        vaccinationStatus: "",
        location: "",
        adoptionFee: "",
        description: "",
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("You must be logged in to add a pet.");
            return;
        }

        if (!form.species || !form.gender) {
            toast.error("Please select Species and Gender.");
            return;
        }

        // 🔥 FIX: normalize before sending to backend
        const petData = {
            ...form,
            species: normalizeSpecies(form.species),
            gender: normalizeGender(form.gender),

            userId: user.id,
            ownerEmail: user.email,
            ownerName: user.name,
            adoptionStatus: "available",

            age: Number(form.age),
            adoptionFee: Number(form.adoptionFee),
        };

        setIsPending(true);

        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/pet`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${tokenData?.token}`,
                    },
                    body: JSON.stringify(petData),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || "Failed to add pet");
            }

            toast.success("Pet added successfully!");

            setForm({
                petName: "",
                species: "",
                breed: "",
                age: "",
                gender: "",
                imageUrl: "",
                healthStatus: "",
                vaccinationStatus: "",
                location: "",
                adoptionFee: "",
                description: "",
            });

        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsPending(false);
        }
    };

    if (isSessionLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 max-w-7xl mx-auto">

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <Card className="p-6 space-y-6">

                    <form onSubmit={onSubmit} className="space-y-6">

                        {/* PET NAME */}
                        <TextField>
                            <Label>Pet Name</Label>
                            <Input
                                value={form.petName}
                                className={'border border-gray-200 rounded-full'}
                                placeholder="Add his/her name"
                                onChange={(e) =>
                                    handleChange("petName", e.target.value)
                                }
                            />
                        </TextField>

                        {/* SPECIES */}
                        <div>
                            <Label>Species</Label>
                            <Select
                                selectedKeys={
                                    form.species ? new Set([form.species]) : new Set()
                                }
                                onSelectionChange={(keys) => {
                                    const value = Array.from(keys)[0] || "";
                                    handleChange("species", value);
                                }}
                            >
                                <Select.Trigger>
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

                        {/* BREED */}
                        <TextField>
                            <Label>Breed</Label>
                            <Input
                                value={form.breed}
                                className={'border border-gray-200 rounded-full'}
                                placeholder="Add his/her breed name"
                                onChange={(e) =>
                                    handleChange("breed", e.target.value)
                                }
                            />
                        </TextField>

                        {/* AGE */}
                        <TextField>
                            <Label>Age</Label>
                            <Input
                                type="number"
                                value={form.age}
                                className={'border border-gray-200 rounded-full'}
                                placeholder="Add his/her age"
                                onChange={(e) =>
                                    handleChange("age", e.target.value)
                                }
                            />
                        </TextField>

                        {/* GENDER */}
                        <div>
                            <Label>Gender</Label>
                            <Select
                                selectedKeys={
                                    form.gender ? new Set([form.gender]) : new Set()
                                }
                                onSelectionChange={(keys) => {
                                    const value = Array.from(keys)[0] || "";
                                    handleChange("gender", value);
                                }}
                            >
                                <Select.Trigger>
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

                        {/* IMAGE */}
                        <TextField>
                            <Label>Image URL</Label>
                            <Input
                                value={form.imageUrl}
                                className={'border border-gray-200 rounded-full'}
                                placeholder="Provide an image url ( imagebb/unsplash )"
                                onChange={(e) =>
                                    handleChange("imageUrl", e.target.value)
                                }
                            />
                        </TextField>

                        {/* HEALTH */}
                        <TextField>
                            <Label>Health Status</Label>
                            <Input
                                value={form.healthStatus}
                                className={'border border-gray-200 rounded-full'}
                                placeholder="Add his/her health status"
                                onChange={(e) =>
                                    handleChange("healthStatus", e.target.value)
                                }
                            />
                        </TextField>

                        {/* VACCINATION */}
                        <TextField>
                            <Label>Vaccination Status</Label>
                            <Input
                                value={form.vaccinationStatus}
                                className={'border border-gray-200 rounded-full'}
                                placeholder="Provide the vaccination status"
                                onChange={(e) =>
                                    handleChange("vaccinationStatus", e.target.value)
                                }
                            />
                        </TextField>

                        {/* LOCATION */}
                        <TextField>
                            <Label>Location</Label>
                            <Input
                                value={form.location}
                                className={'border border-gray-200 rounded-full'}
                                placeholder="Your Location"
                                onChange={(e) =>
                                    handleChange("location", e.target.value)
                                }
                            />
                        </TextField>

                        {/* FEE */}
                        <TextField>
                            <Label>Adoption Fee</Label>
                            <Input
                                type="number"
                                value={form.adoptionFee}
                                className={'border border-gray-200 rounded-full'}
                                placeholder="Adoption Fee you want"
                                onChange={(e) =>
                                    handleChange("adoptionFee", e.target.value)
                                }
                            />
                        </TextField>

                        {/* DESCRIPTION */}
                        <TextField>
                            <Label>Description</Label>
                            <TextArea
                                value={form.description}
                                className={'border border-gray-200 rounded-full'}
                                placeholder="Describe your pet 😊"
                                onChange={(e) =>
                                    handleChange("description", e.target.value)
                                }
                            />
                        </TextField>

                        {/* OWNER EMAIL */}
                        <TextField>
                            <Label>Owner Email</Label>
                            <Input value={user?.email || ""} readOnly />
                        </TextField>

                        {/* BUTTONS */}
                        <div className="flex justify-end gap-3">
                            <Button
                                type="button"
                                onPress={() =>
                                    setForm({
                                        petName: "",
                                        species: "",
                                        breed: "",
                                        age: "",
                                        gender: "",
                                        imageUrl: "",
                                        healthStatus: "",
                                        vaccinationStatus: "",
                                        location: "",
                                        adoptionFee: "",
                                        description: "",
                                    })
                                }
                            >
                                <TrashBin size={16} />
                                Reset
                            </Button>

                            <Button type="submit" isDisabled={isPending}>
                                <FolderPlus size={16} />
                                {isPending ? "Adding..." : "Add Pet"}
                            </Button>
                        </div>

                    </form>

                </Card>
            </motion.div>
        </div>
    );
};

export default AddPetPage;