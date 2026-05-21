import { ArrowRight } from "@gravity-ui/icons";
import Image from "next/image";
import React from "react";

const PetCareTips = () => {
    return (
        <section className="bg-green-50 dark:bg-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4">

                <h2 className="text-3xl font-bold text-green-900 dark:text-green-400 text-center">
                    Pet Care Tips
                </h2>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10">

                    <div className="w-full md:w-1/2 flex justify-center">
                        <Image
                            src="https://images.unsplash.com/photo-1638468382965-b9afcb96e9b1"
                            alt="Caring Owner"
                            width={300}
                            height={100}
                        />
                    </div>

                    <ul className="text-green-800 dark:text-gray-300 space-y-3 text-sm md:text-base">

                        <li className="flex items-center gap-2"><ArrowRight />Provide clean water and healthy food daily</li>
                        <li className="flex items-center gap-2"><ArrowRight />Regular vet checkups are important</li>
                        <li className="flex items-center gap-2"><ArrowRight />Give your pet enough exercise and playtime</li>
                        <li className="flex items-center gap-2"><ArrowRight />Keep vaccinations up to date</li>
                        <li className="flex items-center gap-2"><ArrowRight />Show love, patience, and care</li>

                    </ul>
                </div>

            </div>
        </section>
    );
};

export default PetCareTips;