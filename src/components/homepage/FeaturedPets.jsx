import React from 'react';
import PetCard from '../pet/PetCard';

const FeaturedPets = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet`);

    const allPetData = await res.json();
    // console.log(allPetData);
    const featuredPetData = allPetData.slice(0, 6);
    // console.log(featuredPetData)

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">

                <h2 className="text-3xl font-bold text-green-900 text-center">
                    Featured Pets
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        featuredPetData.map((petData) => (
                            <PetCard
                                key={petData._id}
                                petData={petData}
                            />
                        ))
                    }
                </div>


            </div>
        </section>
    );
};

export default FeaturedPets;