import PetCard from '@/components/pet/PetCard';
import React from 'react';

const AllPets = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet`, {
        cache: "no-store"
    });

    if (!res.ok) {
        return (
            <section className="py-16 text-center text-gray-500">
                Pets temporarily unavailable
            </section>
        );
    }

    const allPetData = await res.json();
    // console.log(allPetData);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-green-800">
                    Find Your New Best Friend
                </h1>

                <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                    Browse adorable pets waiting for a loving home.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    allPetData.map((petData) => (
                        <PetCard
                            key={petData._id}
                            petData={petData}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default AllPets;