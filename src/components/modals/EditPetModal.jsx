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

const normalizeValue = (value) => {
    if (!value) return "";
    if (Array.isArray(value)) return value.join("");
    return String(value).trim();
};

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

            updatedPet.species = normalizeValue(speciesValue);
            updatedPet.gender = normalizeValue(genderValue);

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

                            <form ref={formRef} onSubmit={onSubmit} className="space-y-5">

                                {errorMessage && (
                                    <div className="p-3 rounded-xl border border-black">
                                        {errorMessage}
                                    </div>
                                )}

                                <TextField name="petName" defaultValue={petName}>
                                    <Label className="text-black dark:text-white">Pet Name</Label>
                                    <Input className="w-full bg-white text-black border" />
                                </TextField>

                                <div>
                                    <Label className="text-black dark:text-white">Species</Label>
                                    <Select
                                        selectedKeys={new Set([speciesValue])}
                                        onSelectionChange={(keys) =>
                                            setSpeciesValue(normalizeValue(Array.from(keys)[0]))
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

                                <TextField name="breed" defaultValue={breed}>
                                    <Label className="text-black dark:text-white">Breed</Label>
                                    <Input className="w-full bg-white text-black border" />
                                </TextField>

                                <TextField name="age" defaultValue={age}>
                                    <Label className="text-black dark:text-white">Age</Label>
                                    <Input type="number" className="w-full bg-white text-black border" />
                                </TextField>

                                <div>
                                    <Label className="text-black dark:text-white">Gender</Label>
                                    <Select
                                        selectedKeys={new Set([genderValue])}
                                        onSelectionChange={(keys) =>
                                            setGenderValue(normalizeValue(Array.from(keys)[0]))
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

                                <TextField name="imageUrl" defaultValue={imageUrl}>
                                    <Label className="text-black dark:text-white">Image</Label>
                                    <Input className="w-full bg-white text-black border" />
                                </TextField>

                                <TextField name="healthStatus" defaultValue={healthStatus}>
                                    <Label className="text-black dark:text-white">Health</Label>
                                    <Input className="w-full bg-white text-black border" />
                                </TextField>

                                <TextField name="vaccinationStatus" defaultValue={vaccinationStatus}>
                                    <Label className="text-black dark:text-white">Vaccination</Label>
                                    <Input className="w-full bg-white text-black border" />
                                </TextField>

                                <TextField name="location" defaultValue={location}>
                                    <Label className="text-black dark:text-white">Location</Label>
                                    <Input className="w-full bg-white text-black border" />
                                </TextField>

                                <TextField name="adoptionFee" defaultValue={adoptionFee}>
                                    <Label className="text-black dark:text-white">Adoption Fee</Label>
                                    <Input type="number" className="w-full bg-white text-black border" />
                                </TextField>

                                <TextField name="description" defaultValue={description}>
                                    <Label className="text-black dark:text-white">Description</Label>
                                    <TextArea className="w-full bg-white text-black border" />
                                </TextField>

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