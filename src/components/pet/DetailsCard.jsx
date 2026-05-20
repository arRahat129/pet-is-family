import { Button, Card, Chip, Separator } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiDollar } from 'react-icons/bi';
import { FaMapMarkerAlt, FaMars, FaVenus } from 'react-icons/fa';
import { MdHealthAndSafety, MdPets, MdVaccines } from 'react-icons/md';

const DetailsCard = ({ petDetails }) => {
    const {
        imageUrl,
        petName,
        species,
        breed,
        age,
        gender,
        healthStatus,
        vaccinationStatus,
        location,
        adoptionFee,
        description,
        ownerEmail,
    } = petDetails;

    return (
        <Card className="overflow-hidden border shadow-md rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                    <Image
                        src={imageUrl}
                        alt={petName}
                        width={800}
                        height={800}
                        className="w-full h-full object-cover lg:min-h-75"
                    />

                    <Chip
                        className="absolute top-5 left-5 bg-white/90 backdrop-blur text-black font-semibold"
                    >
                        <div className="flex items-center gap-1">
                            <MdPets />
                            {species}
                        </div>
                    </Chip>
                </div>


                <div className="p-6 md:p-10 flex flex-col justify-between">

                    <div className="space-y-6">

                        <div>
                            <h2 className="text-4xl font-bold text-gray-800">
                                {petName}
                            </h2>

                            <p className="text-lg text-gray-500 mt-2">
                                {breed}
                            </p>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">


                            <div className="bg-gray-50 rounded-2xl p-4 border">
                                <p className="text-sm text-gray-500 mb-2">
                                    Gender
                                </p>

                                <div className="flex items-center gap-2 text-lg font-semibold">
                                    {
                                        gender === "Male"
                                            ? (
                                                <FaMars className="text-blue-500" />
                                            )
                                            : (
                                                <FaVenus className="text-pink-500" />
                                            )
                                    }

                                    {gender}
                                </div>
                            </div>


                            <div className="bg-gray-50 rounded-2xl p-4 border">
                                <p className="text-sm text-gray-500 mb-2">
                                    Age
                                </p>

                                <h3 className="text-lg font-semibold">
                                    {age} Years
                                </h3>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-4 border">
                                <p className="text-sm text-gray-500 mb-2">
                                    Health Status
                                </p>

                                <div className="flex items-center gap-2 text-lg font-semibold text-green-700">
                                    <MdHealthAndSafety />
                                    {healthStatus}
                                </div>
                            </div>


                            <div className="bg-gray-50 rounded-2xl p-4 border">
                                <p className="text-sm text-gray-500 mb-2">
                                    Vaccination
                                </p>

                                <div className="flex items-center gap-2 text-lg font-semibold text-cyan-700">
                                    <MdVaccines />
                                    {vaccinationStatus}
                                </div>
                            </div>


                            <div className="bg-gray-50 rounded-2xl p-4 border sm:col-span-2">
                                <p className="text-sm text-gray-500 mb-2">
                                    Location
                                </p>

                                <div className="flex items-center gap-2 text-lg font-semibold">
                                    <FaMapMarkerAlt className="text-red-500" />
                                    {location}
                                </div>
                            </div>
                        </div>

                        <Separator />


                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                About {petName}
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                {description}
                            </p>
                        </div>

                        <Separator />


                        <div>
                            <p className="text-sm text-gray-500">
                                Owner Contact
                            </p>

                            <p className="font-semibold text-gray-800 mt-1">
                                {ownerEmail}
                            </p>
                        </div>
                    </div>


                    <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">


                        <div className="flex items-center gap-2 text-3xl font-bold text-green-700">
                            <BiDollar />
                            {adoptionFee}
                        </div>


                        <div className="flex gap-3 w-full sm:w-auto">
                            <Link href="/all-pets">
                                <Button
                                    variant="outline"
                                    className="rounded-xl w-full sm:w-auto"
                                >
                                    Back
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default DetailsCard;