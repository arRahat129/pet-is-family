"use client";

import React, { useState } from "react";
import {
    Button,
    Card,
    FieldError,
    Input,
    Label,
    ListBox,
    Select,
    TextArea,
    TextField,
} from "@heroui/react";
import { FolderPlus, TrashBin } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const AddPetPage = () => {
    const [isPending, setIsPending] = useState(false);
    const [species, setSpecies] = useState(new Set([]));
    const [gender, setGender] = useState(new Set([]));

    const { data: session, isPending: isSessionLoading } = authClient.useSession();
    const user = session?.user;

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("You must be logged in to add a pet.");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());

        const selectedSpecies = Array.from(species)[0];
        const selectedGender = Array.from(gender)[0];

        if (!selectedSpecies || !selectedGender) {
            toast.error("Please select both Species and Gender.");
            return;
        }

        const petData = {
            ...formEntries,
            species: selectedSpecies,
            gender: selectedGender,
            userId: user.id,
            ownerEmail: user.email,
            ownerName: user.name,
            adoptionStatus: "available",
            age: Number(formEntries.age),
            adoptionFee: Number(formEntries.adoptionFee)
        };

        setIsPending(true);
        const { data: tokenData } = await authClient.token();

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/pet`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${tokenData?.token}`
                    },
                    body: JSON.stringify(petData),
                }
            );

            if (res.ok) {
                toast.success("Pet added successfully!");
                e.target.reset();
                setSpecies(new Set([]));
                setGender(new Set([]));
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to add pet");
            }
        } catch (error) {
            toast.error(`Something went wrong: ${error.message}`);
        } finally {
            setIsPending(false);
        }
    };

    if (isSessionLoading) {
        return (
            <div className="p-16 max-w-7xl mx-auto text-center font-medium bg-white dark:bg-neutral-950 text-white border border-neutral-200 dark:border-neutral-800 rounded-xl">
                Loading session configuration...
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto bg-transparent">
            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-green-800 dark:text-white">
                    Add Pet
                </h1>
                <p className="mt-2 text-sm  text-green-800 dark:text-white">
                    List a new pet available for adoption.
                </p>
            </div>

            <Card className="py-5 border my-6 shadow-sm bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden">
                <form
                    className="p-4 md:p-8 lg:p-10 space-y-8 w-full"
                    onSubmit={onSubmit}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="md:col-span-2">
                            <TextField name="petName" isRequired className="flex flex-col gap-1.5">
                                <Label className="text-sm font-semibold text-white">Pet Name</Label>
                                <Input className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-white placeholder-white/50" placeholder="Buddy" />
                                <FieldError className="text-xs text-red-400 mt-1" />
                            </TextField>
                        </div>

                        <div>
                            <Select
                                name="species"
                                isRequired
                                selectedKeys={species}
                                onSelectionChange={setSpecies}
                                className="flex flex-col gap-1.5"
                            >
                                <Label className="text-sm font-semibold text-white">Species</Label>
                                <Select.Trigger className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-white min-h-[40px] px-3 flex items-center justify-between">
                                    <Select.Value className="text-white" />
                                    <Select.Indicator className="text-white" />
                                </Select.Trigger>
                                <Select.Popover className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg mt-1 overflow-hidden z-50">
                                    <ListBox className="p-1">
                                        <ListBox.Item id="Dog" className="px-4 py-2 text-sm rounded-xl cursor-pointer hover:bg-neutral-800 text-white">Dog</ListBox.Item>
                                        <ListBox.Item id="Cat" className="px-4 py-2 text-sm rounded-xl cursor-pointer hover:bg-neutral-800 text-white">Cat</ListBox.Item>
                                        <ListBox.Item id="Bird" className="px-4 py-2 text-sm rounded-xl cursor-pointer hover:bg-neutral-800 text-white">Bird</ListBox.Item>
                                        <ListBox.Item id="Rabbit" className="px-4 py-2 text-sm rounded-xl cursor-pointer hover:bg-neutral-800 text-white">Rabbit</ListBox.Item>
                                        <ListBox.Item id="Other" className="px-4 py-2 text-sm rounded-xl cursor-pointer hover:bg-neutral-800 text-white">Other</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <TextField name="breed" isRequired className="flex flex-col gap-1.5">
                            <Label className="text-sm font-semibold text-white">Breed</Label>
                            <Input className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-white placeholder-white/50" placeholder="Golden Retriever" />
                            <FieldError className="text-xs text-red-400 mt-1" />
                        </TextField>

                        <TextField name="age" type="number" isRequired className="flex flex-col gap-1.5">
                            <Label className="text-sm font-semibold text-white">Age (in years)</Label>
                            <Input className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-white placeholder-white/50" placeholder="2" />
                            <FieldError className="text-xs text-red-400 mt-1" />
                        </TextField>

                        <div>
                            <Select
                                name="gender"
                                isRequired
                                selectedKeys={gender}
                                onSelectionChange={setGender}
                                className="flex flex-col gap-1.5"
                            >
                                <Label className="text-sm font-semibold text-white">Gender</Label>
                                <Select.Trigger className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-white min-h-[40px] px-3 flex items-center justify-between">
                                    <Select.Value className="text-white" />
                                    <Select.Indicator className="text-white" />
                                </Select.Trigger>
                                <Select.Popover className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg mt-1 overflow-hidden z-50">
                                    <ListBox className="p-1">
                                        <ListBox.Item id="Male" className="px-4 py-2 text-sm rounded-xl cursor-pointer hover:bg-neutral-800 text-white">Male</ListBox.Item>
                                        <ListBox.Item id="Female" className="px-4 py-2 text-sm rounded-xl cursor-pointer hover:bg-neutral-800 text-white">Female</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <div className="md:col-span-2">
                            <TextField name="imageUrl" isRequired className="flex flex-col gap-1.5">
                                <Label className="text-sm font-semibold text-white">Image URL</Label>
                                <Input className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-white placeholder-white/50" placeholder="https://example.com/pet.jpg" />
                                <FieldError className="text-xs text-red-400 mt-1" />
                            </TextField>
                        </div>

                        <TextField name="healthStatus" isRequired className="flex flex-col gap-1.5">
                            <Label className="text-sm font-semibold text-white">Health Status</Label>
                            <Input className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-white placeholder-white/50" placeholder="Healthy, dewormed" />
                            <FieldError className="text-xs text-red-400 mt-1" />
                        </TextField>

                        <TextField name="vaccinationStatus" isRequired className="flex flex-col gap-1.5">
                            <Label className="text-sm font-semibold text-white">Vaccination Status</Label>
                            <Input className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-white placeholder-white/50" placeholder="Fully Vaccinated" />
                            <FieldError className="text-xs text-red-400 mt-1" />
                        </TextField>

                        <TextField name="location" isRequired className="flex flex-col gap-1.5">
                            <Label className="text-sm font-semibold text-white">Location</Label>
                            <Input className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-white placeholder-white/50" placeholder="New York, NY" />
                            <FieldError className="text-xs text-red-400 mt-1" />
                        </TextField>

                        <TextField name="adoptionFee" type="number" isRequired className="flex flex-col gap-1.5">
                            <Label className="text-sm font-semibold text-white">Adoption Fee ($)</Label>
                            <Input className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-white placeholder-white/50" placeholder="50" />
                            <FieldError className="text-xs text-red-400 mt-1" />
                        </TextField>

                        <div className="md:col-span-2">
                            <TextField className="flex flex-col gap-1.5">
                                <Label className="text-sm font-semibold text-white">Owner Email</Label>
                                <Input
                                    value={user?.email || "No user detected"}
                                    readOnly
                                    className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 cursor-not-allowed text-white/60"
                                />
                            </TextField>
                        </div>

                        <div className="md:col-span-2">
                            <TextField name="description" isRequired className="flex flex-col gap-1.5">
                                <Label className="text-sm font-semibold text-white">Description</Label>
                                <TextArea className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-white min-h-[120px] p-3 placeholder-white/50" placeholder="Tell us about your pet's personality..." />
                                <FieldError className="text-xs text-red-400 mt-1" />
                            </TextField>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-900">
                        <Button
                            type="reset"
                            onPress={() => {
                                setSpecies(new Set([]));
                                setGender(new Set([]));
                            }}
                            className="rounded-2xl border border-red-200 hover:border-red-300 dark:border-red-900/30 text-red-400 bg-red-950/10 hover:bg-red-950/20 w-full sm:w-auto font-medium"
                        >
                            <TrashBin size={16} />
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            isLoading={isPending}
                            isDisabled={isPending}
                            className="rounded-2xl bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto font-semibold transition shadow-sm"
                        >
                            {!isPending && <FolderPlus size={16} />}
                            {isPending ? "Adding Pet..." : "Add Pet"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddPetPage;