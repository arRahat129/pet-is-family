import { Card, Chip, Separator, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiDollar } from "react-icons/bi";
import { FaMars, FaVenus } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import MotionWrapper from "../motion/MotionWrapper";

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
        adoptionStatus
    } = petData;

    return (
        <MotionWrapper>
            <Card className="group overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl bg-white dark:bg-neutral-950 dark:border-neutral-800">

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
                        className="
        absolute top-4 left-4
        bg-white dark:bg-neutral-900
        text-black dark:text-white
        font-bold shadow-md
        animate-pulse
        hover:scale-110
        transition-transform duration-300
    "
                    >
                        <div className="flex items-center gap-1">
                            <MdPets className="text-base" />

                            <span className="font-bold tracking-wide">
                                {species}
                            </span>
                        </div>
                    </Chip>

                    <div className="absolute top-4 right-4">
                        <Chip
                            size="sm"
                            className={`font-bold uppercase text-[10px] tracking-wider
                            ${adoptionStatus === "adopted"
                                    ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                }
                        `}
                        >
                            {adoptionStatus || "available"}
                        </Chip>
                    </div>

                </div>

                <div className="p-5 space-y-4">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {petName}
                        </h1>

                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            {breed}
                        </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">

                        <div className="flex items-center gap-2">
                            {
                                gender === "Male"
                                    ? <FaMars className="text-blue-500" />
                                    : <FaVenus className="text-pink-500" />
                            }

                            <span>{gender}</span>
                        </div>

                        <div className="flex items-center gap-1 font-semibold text-green-700 dark:text-green-400">
                            <BiDollar size={20} />
                            {adoptionFee}
                        </div>
                    </div>

                    <Separator />

                    <div className="flex">
                        <Link href={`/all-pets/${_id}`} className="w-full">
                            <Button
                                className="w-full bg-green-600 text-white font-medium rounded-xl"
                            >
                                View Details & Adopt Now!
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </MotionWrapper>
    );
};

export default PetCard;