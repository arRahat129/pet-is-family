import AdoptionForm from '@/components/pet/AdoptionForm';
import DetailsCard from '@/components/pet/DetailsCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const PetDetailsCard = async ({ params }) => {
    const { id } = await params;

    const tokenRes = await auth.api.getToken({
        headers: await headers()
    });

    const token = tokenRes?.token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet/${id}`, {
        headers: token
            ? { authorization: `Bearer ${token}` }
            : {}
    });

    if (!res.ok) {
        return (
            <section className="py-16 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-black">
                Pet temporarily unavailable
            </section>
        );
    }

    const petDetails = await res.json();
    const { _id, petName } = petDetails;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 bg-white dark:bg-black">

            <div className="mb-10 bg-white dark:bg-black">
                <h1 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-white">
                    Meet {petName}
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Give this adorable pet a loving forever home.
                </p>
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>

                <div className='xl:col-span-2'>
                    <DetailsCard key={_id} petDetails={petDetails} />
                </div>

                <div>
                    <AdoptionForm key={_id} petDetails={petDetails} />
                </div>

            </div>

        </div>
    );
};

export default PetDetailsCard;