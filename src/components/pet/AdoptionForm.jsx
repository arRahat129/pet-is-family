import { Button, Card, Input, Label, TextArea, TextField } from '@heroui/react';
import React from 'react';

const AdoptionForm = ({petDetails}) => {
    const {
        petName,
    } = petDetails;
    return (
        <Card className="border shadow-md rounded-3xl sticky top-24">

            <div className="p-6 md:p-8">

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-green-800">
                        Adopt {petName}
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Fill out the form to request adoption.
                    </p>
                </div>

                <form className="space-y-6">

                    <TextField>
                        <Label>Pet Name</Label>

                        <Input
                            value={petName}
                            readOnly
                            className="bg-gray-100 rounded-2xl"
                        />
                    </TextField>

                    <TextField>
                        <Label>Your Name</Label>

                        <Input
                            value={loggedUser.name}
                            readOnly
                            className="bg-gray-100 rounded-2xl"
                        />
                    </TextField>

                    <TextField>
                        <Label>Your Email</Label>

                        <Input
                            value={loggedUser.email}
                            readOnly
                            className="bg-gray-100 rounded-2xl"
                        />
                    </TextField>

                    <TextField
                        type="date"
                        name="pickupDate"
                        isRequired
                    >
                        <Label>Pickup Date</Label>

                        <Input
                            type="date"
                            className="rounded-2xl bg-gray-100"
                        />
                    </TextField>

                    <TextField
                        name="message"
                        isRequired
                    >
                        <Label>Message</Label>

                        <TextArea
                            placeholder="Why do you want to adopt this pet?"
                            className="rounded-3xl bg-gray-100"
                        />
                    </TextField>

                    <input
                        type="hidden"
                        name="status"
                        value="pending"
                    />

                    <input
                        type="hidden"
                        name="petId"
                        value={_id}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-green-600 text-white rounded-2xl h-12 text-base font-semibold"
                    >
                        Adopt Now
                    </Button>
                </form>
            </div>
        </Card>
    );
};

export default AdoptionForm;