import { Button, Card, Chip, Separator } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiDollar } from 'react-icons/bi';
import { FaMapMarkerAlt, FaMars, FaVenus } from 'react-icons/fa';
import { MdHealthAndSafety, MdPets, MdVaccines } from 'react-icons/md';
import MotionWrapper from '../motion/MotionWrapper';

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
        <MotionWrapper>
            <Card className="overflow-hidden border shadow-md rounded-3xl bg-white dark:bg-neutral-950 dark:border-neutral-800">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative">
                        <Image
                            src={imageUrl}
                            alt={petName}
                            width={800}
                            height={800}
                            className="w-full h-full object-cover lg:min-h-75"
                        />

                        <Chip className="absolute top-5 left-5 bg-white/90 dark:bg-neutral-900/80 backdrop-blur text-black dark:text-white font-semibold">
                            <div className="flex items-center gap-1">
                                <MdPets />
                                {species}
                            </div>
                        </Chip>
                    </div>

                    <div className="p-6 md:p-10 flex flex-col justify-between">

                        <div className="space-y-6">

                            <div>
                                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                                    {petName}
                                </h2>

                                <p className="text-lg text-gray-500 dark:text-gray-400">
                                    {breed}
                                </p>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-4 border dark:border-neutral-800">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Gender
                                    </p>

                                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
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

                                <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-4 border dark:border-neutral-800">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        Age
                                    </p>

                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {age} Years
                                    </h3>
                                </div>

                                <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-4 border dark:border-neutral-800">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        Health Status
                                    </p>

                                    <div className="flex items-center gap-2 text-lg font-semibold text-green-700 dark:text-green-400">
                                        <MdHealthAndSafety />
                                        {healthStatus}
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-4 border dark:border-neutral-800">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        Vaccination
                                    </p>

                                    <div className="flex items-center gap-2 text-lg font-semibold text-cyan-700 dark:text-cyan-400">
                                        <MdVaccines />
                                        {vaccinationStatus}
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-4 border dark:border-neutral-800 sm:col-span-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                        Location
                                    </p>

                                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        <FaMapMarkerAlt className="text-red-500" />
                                        {location}
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                                    About {petName}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {description}
                                </p>
                            </div>

                            <Separator />

                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Owner Contact
                                </p>

                                <p className="font-semibold text-gray-800 dark:text-white mt-1">
                                    {ownerEmail}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">

                            <div className="flex items-center gap-2 text-3xl font-bold text-green-700 dark:text-green-400">
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
        </MotionWrapper>
    );
};

export default DetailsCard;