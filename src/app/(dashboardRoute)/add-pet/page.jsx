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
    // console.log(user)

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const formEntries = Object.fromEntries(formData.entries());

        // console.log(petData);

        const selectedSpecies = Array.from(species)[0];
        const selectedGender = Array.from(gender)[0];

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
        // console.log(tokenData);

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

            if (!res.ok) {
                return (
            <section className="py-16 text-center text-gray-500">
                Temporarily unavailable
            </section>
        );
            }

            const data = await res.json();

            if (res.ok) {
                toast.success("Pet added successfully!");
                e.target.reset();

                setSpecies(new Set([]));
                setGender(new Set([]));
            } else {
                toast.error(data.message || "Failed to add pet");
            }
        }
        catch (error) {
            toast.error(`Something went wrong" ${error.message}`);
        }
        finally {
            setIsPending(false);
        }
    };

    if (isSessionLoading) {
        return <div className="p-6 max-w-7xl mx-auto text-center">Loading session configuration...</div>;
    }

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-green-900">
                Add Pet
            </h1>

            <Card className="py-5 border my-10 md:my-16 shadow-sm">
                <form
                    className="p-4 md:p-8 lg:p-10 space-y-8 w-full"
                    onSubmit={onSubmit}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">


                        <div className="md:col-span-2">
                            <TextField name="petName" isRequired>
                                <Label>Pet Name</Label>
                                <Input
                                    placeholder="Buddy"
                                    className="rounded-2xl bg-gray-100"
                                />
                                <FieldError />
                            </TextField>
                        </div>


                        <div>
                            <Select
                                name="species"
                                isRequired
                                className="w-full"
                                placeholder="Select species"
                                // ADD THESE TWO PROPS:
                                selectedKeys={species}
                                onSelectionChange={setSpecies}
                            >
                                <Label>Species</Label>

                                <Select.Trigger className="rounded-2xl bg-gray-100">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="Dog" textValue="Dog">
                                            Dog
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item id="Cat" textValue="Cat">
                                            Cat
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item id="Bird" textValue="Bird">
                                            Bird
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item id="Rabbit" textValue="Rabbit">
                                            Rabbit
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item id="Other" textValue="Other">
                                            Other
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>


                        <TextField name="breed" isRequired>
                            <Label>Breed</Label>
                            <Input
                                placeholder="Golden Retriever"
                                className="rounded-2xl bg-gray-100"
                            />
                            <FieldError />
                        </TextField>


                        <TextField name="age" type="number" isRequired>
                            <Label>Age</Label>
                            <Input
                                type="number"
                                placeholder="2"
                                className="rounded-2xl bg-gray-100"
                            />
                            <FieldError />
                        </TextField>


                        <div>
                            <Select
                                name="gender"
                                isRequired
                                className="w-full"
                                placeholder="Select gender"
                                // ADD THESE TWO PROPS:
                                selectedKeys={gender}
                                onSelectionChange={setGender}
                            >
                                <Label>Gender</Label>

                                <Select.Trigger className="rounded-2xl bg-gray-100">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="Male" textValue="Male">
                                            Male
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>

                                        <ListBox.Item id="Female" textValue="Female">
                                            Female
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>


                        <div className="md:col-span-2">
                            <TextField name="imageUrl" isRequired>
                                <Label>Image URL</Label>
                                <Input
                                    type="url"
                                    placeholder="https://i.ibb.co/example.jpg"
                                    className="rounded-2xl bg-gray-100"
                                />
                                <FieldError />
                            </TextField>
                        </div>


                        <TextField name="healthStatus" isRequired>
                            <Label>Health Status</Label>
                            <Input
                                placeholder="Healthy"
                                className="rounded-2xl bg-gray-100"
                            />
                            <FieldError />
                        </TextField>


                        <TextField name="vaccinationStatus" isRequired>
                            <Label>Vaccination Status</Label>
                            <Input
                                placeholder="Vaccinated"
                                className="rounded-2xl bg-gray-100"
                            />
                            <FieldError />
                        </TextField>


                        <TextField name="location" isRequired>
                            <Label>Location</Label>
                            <Input
                                placeholder="Chattogram, Bangladesh"
                                className="rounded-2xl bg-gray-100"
                            />
                            <FieldError />
                        </TextField>


                        <TextField name="adoptionFee" type="number" isRequired>
                            <Label>Adoption Fee</Label>
                            <Input
                                type="number"
                                placeholder="100"
                                className="rounded-2xl bg-gray-100"
                            />
                            <FieldError />
                        </TextField>


                        <div className="md:col-span-2">
                            <TextField name="ownerEmail" isRequired>
                                <Label>Owner Email</Label>
                                <Input
                                    value={user?.email || "No user detected"}
                                    readOnly
                                    className="rounded-2xl bg-gray-100 font-medium text-slate-600 cursor-not-allowed"
                                />
                                <FieldError />
                            </TextField>
                        </div>


                        <div className="md:col-span-2">
                            <TextField name="description" isRequired>
                                <Label>Description</Label>

                                <TextArea
                                    placeholder="Write about the pet personality, habits, and care needs..."
                                    className="rounded-3xl bg-gray-100"
                                />

                                <FieldError />
                            </TextField>
                        </div>
                    </div>


                    <div className="flex flex-col sm:flex-row justify-end gap-3">
                        <Button
                            type="reset"
                            variant="outline"
                            className="rounded-sm text-red-500 border-red-500 w-full sm:w-auto"
                            // ADD THIS EVENT HANDLER:
                            onPress={() => {
                                setSpecies(new Set([]));
                                setGender(new Set([]));
                            }}
                        >
                            <TrashBin />
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="outline"
                            isLoading={isPending}
                            isDisabled={isPending}
                            className="rounded-none bg-green-600 text-white w-full sm:w-auto"
                        >
                            <FolderPlus />

                            {isPending ? "Adding Pet..." : "Add Pet"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddPetPage;