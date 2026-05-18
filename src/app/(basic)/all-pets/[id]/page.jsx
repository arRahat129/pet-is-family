import AdoptionForm from '@/components/pet/AdoptionForm';
import DetailsCard from '@/components/pet/DetailsCard';
import React from 'react';

const PetDetailsCard = async ({ params }) => {
    const { id } = await params;
    // console.log(id);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet/${id}`);

    const petDetails = await res.json();
    // console.log(petDetails);

    const {
        _id,
        petName,
    } = petDetails;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">

            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-green-800">
                    Meet {petName}
                </h1>

                <p className="text-gray-500 mt-2">
                    Give this adorable pet a loving forever home.
                </p>
            </div>

            <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>

                <div className='xl:col-span-2'>
                    <DetailsCard key={_id} petDetails={petDetails} />
                </div>

                <div>
                    {/* <AdoptionForm key={_id} petDetails={petDetails} /> */}
                </div>

            </div>
            
        </div>
    );
};

export default PetDetailsCard;