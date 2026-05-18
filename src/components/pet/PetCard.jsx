import { Card, Chip, Separator, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiDollar } from "react-icons/bi";
import { FaMars, FaVenus } from "react-icons/fa";
import { MdPets } from "react-icons/md";

const PetCard = ({ petData }) => {
    // console.log(petData);

    const {
        _id,
        imageUrl,
        petName,
        species,
        breed,
        gender,
        adoptionFee,
    } = petData;

    return (
        <Card className="group overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl">

            <div className="relative overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={petName}
                    width={500}
                    height={500}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <Chip
                    size="sm"
                    className="absolute top-4 left-4 bg-white text-black font-medium"
                >
                    <div className="flex items-center gap-1">
                        <MdPets />
                        {species}
                    </div>
                </Chip>
            </div>

            <div className="p-5 space-y-4">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {petName}
                    </h1>

                    <p className="text-gray-500 text-sm mt-1">
                        {breed}
                    </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">

                    <div className="flex items-center gap-2">
                        {
                            gender === "Male"
                                ? <FaMars className="text-blue-500" />
                                : <FaVenus className="text-pink-500" />
                        }

                        <span>{gender}</span>
                    </div>

                    <div className="flex items-center gap-1 font-semibold text-green-700">
                        <BiDollar size={20} />
                        {adoptionFee}
                    </div>
                </div>

                <Separator />

                <div className="flex gap-3">
                    <Link href={`/all-pets/${_id}`}>
                        <Button
                            className="w-full bg-green-600 text-white font-medium rounded-xl"
                        >
                            View Details
                        </Button>
                    </Link>

                    <Button
                        variant="outline"
                        className="rounded-xl hover:bg-purple-100"
                    >
                        Adopt Now
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default PetCard;