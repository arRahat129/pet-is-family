import FilterPanel from '@/components/pet/FilterPanel';
import PetCard from '@/components/pet/PetCard';
import React from 'react';

const AllPets = async ({ searchParams }) => {
    const params = await searchParams;
    const search = params.search || '';
    const species = params.species || '';
    const sort = params.sort || 'newest';

    const query = new URLSearchParams({
        search,
        species,
        sort
    }).toString();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet?${query}`, {
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

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 bg-linear-to-b from-white to-green-50/30 dark:from-black dark:to-neutral-950 min-h-screen">

            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-white">
                    Find Your New Best Friend
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
                    Browse adorable pets waiting for a loving home.
                </p>
            </div>

            <FilterPanel currentSearch={search} currentSpecies={species} currentSort={sort} />

            <div className="mt-2">
                {
                    allPetData.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-green-200 dark:border-neutral-800 rounded-2xl bg-green-50/10">
                            <p className="text-gray-500 dark:text-gray-400 font-medium">
                                No pets match your search criteria. Try modifying your filter states.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                            {allPetData.map((petData) => (
                                <PetCard
                                    key={petData._id}
                                    petData={petData}
                                />
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AllPets;