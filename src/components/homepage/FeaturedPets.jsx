import React from 'react';
import PetCard from '../pet/PetCard';

const FeaturedPets = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet`, {
        cache: "no-store"
    });

    if (!res.ok) {
        return (
            <section className="py-16 text-center text-gray-500 dark:text-gray-400">
                Pets temporarily unavailable
            </section>
        );
    }

    const allPetData = await res.json();
    const featuredPetData = allPetData.slice(0, 6);

    return (
        <section className="bg-white dark:bg-gray-950 py-16">
            <div className="max-w-7xl mx-auto px-4">

                <h2 className="text-3xl font-bold text-green-900 dark:text-green-400 text-center">
                    Featured Pets
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredPetData.map((petData) => (
                        <PetCard key={petData._id} petData={petData} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedPets;