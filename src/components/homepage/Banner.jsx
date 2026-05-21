import React from "react";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {
    return (
        <section className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">

                <div className="flex-1 text-center md:text-left">

                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                        Every Pet Deserves a Loving Home 🐾
                    </h1>

                    <p className="mt-4 text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0">
                        Adopt a pet, donate to shelters, and help us build a world where no animal is left behind.
                    </p>

                    <div className="mt-6 flex justify-center md:justify-start">
                        <Link
                            href="/all-pets"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
                        >
                            Adopt Now
                        </Link>
                    </div>

                </div>

                <div className="flex-1 flex justify-center">
                    <div className="w-full max-w-sm md:max-w-md">

                        <Image
                            src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6"
                            alt="Cute pet"
                            width={600}
                            height={600}
                            className="w-full h-auto rounded-2xl shadow-lg object-cover"
                            priority
                        />

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Banner;