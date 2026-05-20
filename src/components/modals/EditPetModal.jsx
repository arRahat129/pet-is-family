"use client";

import React, { useRef, useState } from "react";
import {
    Button,
    FieldError,
    Input,
    Label,
    ListBox,
    Modal,
    Surface,
    TextArea,
    TextField,
    Select
} from "@heroui/react";

import { FolderPlus, TrashBin } from "@gravity-ui/icons";
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
            toast.error(error);
            setErrorMessage(error.message || "Something went wrong");
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

                <Modal.Backdrop className="backdrop-blur-sm bg-black/40">

                    <Modal.Container placement="center">

                        <Modal.Dialog className="sm:max-w-3xl rounded-3xl">

                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <Modal.Icon className="bg-primary/10 text-primary">
                                    <FolderPlus className="size-5" />
                                </Modal.Icon>

                                <Modal.Heading>Edit Pet</Modal.Heading>

                                <p className="text-sm text-gray-500 mt-1">
                                    Update pet information
                                </p>
                            </Modal.Header>

                            <Modal.Body className="p-6">

                                <Surface>

                                    <form ref={formRef} onSubmit={onSubmit} className="space-y-6">

                                        {errorMessage && (
                                            <div className="bg-red-100 text-red-600 p-3 rounded-xl">
                                                {errorMessage}
                                            </div>
                                        )}

                                        <TextField name="petName" defaultValue={petName}>
                                            <Label>Pet Name</Label>
                                            <Input className="rounded-xl" />
                                        </TextField>

                                        <div>
                                            <Label>Species</Label>
                                            <Select
                                                selectedKeys={new Set([speciesValue])}
                                                onSelectionChange={(keys) =>
                                                    setSpeciesValue(Array.from(keys))
                                                }
                                            >
                                                <Select.Trigger className="rounded-xl">
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
                                            <Label>Breed</Label>
                                            <Input className="rounded-xl" />
                                        </TextField>

                                        <TextField name="age" defaultValue={age}>
                                            <Label>Age</Label>
                                            <Input type="number" className="rounded-xl" />
                                        </TextField>

                                        <div>
                                            <Label>Gender</Label>
                                            <Select
                                                selectedKeys={new Set([genderValue])}
                                                onSelectionChange={(keys) =>
                                                    setGenderValue(Array.from(keys))
                                                }
                                            >
                                                <Select.Trigger className="rounded-xl">
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
                                            <Label>Image</Label>
                                            <Input className="rounded-xl" />
                                        </TextField>

                                        <TextField name="healthStatus" defaultValue={healthStatus}>
                                            <Label>Health</Label>
                                            <Input className="rounded-xl" />
                                        </TextField>

                                        <TextField name="vaccinationStatus" defaultValue={vaccinationStatus}>
                                            <Label>Vaccination</Label>
                                            <Input className="rounded-xl" />
                                        </TextField>

                                        <TextField name="location" defaultValue={location}>
                                            <Label>Location</Label>
                                            <Input className="rounded-xl" />
                                        </TextField>

                                        <TextField name="adoptionFee" defaultValue={adoptionFee}>
                                            <Label>Adoption Fee</Label>
                                            <Input type="number" className="rounded-xl" />
                                        </TextField>

                                        <TextField name="description" defaultValue={description}>
                                            <Label>Description</Label>
                                            <TextArea className="rounded-xl" />
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