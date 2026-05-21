"use client";

import React, { useRef, useState } from "react";
import {
    Button,
    Label,
    ListBox,
    Modal,
    Surface,
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

    const {
        _id,
        petName,
        species,
        breed,
        age,
        gender,
        imageUrl,
        healthStatus,
        vaccinationStatus,
        location,
        adoptionFee,
        description
    } = pet;

    const router = useRouter();
    const formRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [speciesValue, setSpeciesValue] = useState(species || "");
    const [genderValue, setGenderValue] = useState(gender || "");

    const onSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");
        setIsLoading(true);

        try {
            const formData = new FormData(formRef.current);
            const updatedPet = Object.fromEntries(formData.entries());

            updatedPet.age = Number(updatedPet.age);
            updatedPet.adoptionFee = Number(updatedPet.adoptionFee);

            updatedPet.species = speciesValue;
            updatedPet.gender = genderValue;

            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/pet/${_id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${tokenData?.token}`
                    },
                    body: JSON.stringify(updatedPet)
                }
            );

            if (!res.ok) throw new Error("Failed to update pet");

            const data = await res.json();

            if (data.modifiedCount > 0) {
                toast.success("Pet updated successfully");
            } else {
                toast.success("No changes detected");
            }

            router.refresh();
            setIsOpen(false);

        } catch (error) {
            toast.error(error?.message || "Error");
            setErrorMessage(error?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>

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

            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>

                <Modal.Backdrop className="backdrop-blur-sm bg-black/40 dark:bg-black/70">

                    <Modal.Container placement="center">

                        <Modal.Dialog className="sm:max-w-3xl rounded-3xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">

                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <Modal.Icon className="bg-primary/10 text-primary">
                                    <FolderPlus className="size-5" />
                                </Modal.Icon>

                                <Modal.Heading className="text-gray-900 dark:text-white">
                                    Edit Pet
                                </Modal.Heading>

                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Update pet information
                                </p>
                            </Modal.Header>

                            <Modal.Body className="p-6">

                                <Surface className="bg-white dark:bg-gray-950">

                                    <form ref={formRef} onSubmit={onSubmit} className="space-y-6">

                                        {errorMessage && (
                                            <div className="bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300 p-3 rounded-xl">
                                                {errorMessage}
                                            </div>
                                        )}

                                        <TextField name="petName" defaultValue={petName}>
                                            <Label className="dark:text-gray-300">Pet Name</Label>
                                            <Input className="rounded-xl dark:bg-gray-900 dark:text-white" />
                                        </TextField>

                                        <div>
                                            <Label className="dark:text-gray-300">Species</Label>
                                            <Select
                                                selectedKeys={new Set([speciesValue])}
                                                onSelectionChange={(keys) =>
                                                    setSpeciesValue(Array.from(keys)[0])
                                                }
                                            >
                                                <Select.Trigger className="rounded-xl dark:bg-gray-900 dark:text-white">
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

                                        <TextField name="breed" defaultValue={breed}>
                                            <Label className="dark:text-gray-300">Breed</Label>
                                            <Input className="rounded-xl dark:bg-gray-900 dark:text-white" />
                                        </TextField>

                                        <TextField name="age" defaultValue={age}>
                                            <Label className="dark:text-gray-300">Age</Label>
                                            <Input type="number" className="rounded-xl dark:bg-gray-900 dark:text-white" />
                                        </TextField>

                                        <div>
                                            <Label className="dark:text-gray-300">Gender</Label>
                                            <Select
                                                selectedKeys={new Set([genderValue])}
                                                onSelectionChange={(keys) =>
                                                    setGenderValue(Array.from(keys)[0])
                                                }
                                            >
                                                <Select.Trigger className="rounded-xl dark:bg-gray-900 dark:text-white">
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

                                        <TextField name="imageUrl" defaultValue={imageUrl}>
                                            <Label className="dark:text-gray-300">Image</Label>
                                            <Input className="rounded-xl dark:bg-gray-900 dark:text-white" />
                                        </TextField>

                                        <TextField name="healthStatus" defaultValue={healthStatus}>
                                            <Label className="dark:text-gray-300">Health</Label>
                                            <Input className="rounded-xl dark:bg-gray-900 dark:text-white" />
                                        </TextField>

                                        <TextField name="vaccinationStatus" defaultValue={vaccinationStatus}>
                                            <Label className="dark:text-gray-300">Vaccination</Label>
                                            <Input className="rounded-xl dark:bg-gray-900 dark:text-white" />
                                        </TextField>

                                        <TextField name="location" defaultValue={location}>
                                            <Label className="dark:text-gray-300">Location</Label>
                                            <Input className="rounded-xl dark:bg-gray-900 dark:text-white" />
                                        </TextField>

                                        <TextField name="adoptionFee" defaultValue={adoptionFee}>
                                            <Label className="dark:text-gray-300">Adoption Fee</Label>
                                            <Input type="number" className="rounded-xl dark:bg-gray-900 dark:text-white" />
                                        </TextField>

                                        <TextField name="description" defaultValue={description}>
                                            <Label className="dark:text-gray-300">Description</Label>
                                            <TextArea className="rounded-xl dark:bg-gray-900 dark:text-white" />
                                        </TextField>

                                        <div className="flex gap-3 justify-end pt-4">

                                            <Button
                                                type="button"
                                                variant="secondary"
                                                onPress={() => setIsOpen(false)}
                                            >
                                                Cancel
                                            </Button>

                                            <Button type="submit" isDisabled={isLoading}>
                                                {isLoading ? "Saving..." : "Save"}
                                            </Button>
                                        </div>
                                    </form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

        </div>
    );
};

export default EditPetModal;