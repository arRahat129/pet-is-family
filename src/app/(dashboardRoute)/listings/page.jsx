import RequestsModal from '@/components/modals/RequestsModal';
import { auth } from '@/lib/auth';
import { Button } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ListingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    // console.log(session);
    const user = session?.user;
    // console.log(user)

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption/owner/${user.id}`)
    const petOwner = await res.json();

    console.log(petOwner);

    const total = petOwner.length;

    const adopted = petOwner.filter(p => p.adoptionStatus.toLowerCase() === "adopted").length;
    const available = petOwner.filter(p => p.adoptionStatus.toLowerCase() === "available").length;
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-10'>

            <div className='mb-10'>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-900'>
                    My Listings
                </h1>

                <p className='text-gray-500 mt-2'>
                    Manage your pets and adoption requests
                </p>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-10'>

                <div className='p-5 rounded-2xl border bg-white shadow-sm'>
                    <p className='text-3xl font-bold'>{total}</p>
                    <p className='text-gray-500 text-sm'>Total Listings</p>
                </div>

                <div className='p-5 rounded-2xl border bg-green-50'>
                    <p className='text-3xl font-bold text-green-600'>{available}</p>
                    <p className='text-gray-500 text-sm'>Available</p>
                </div>

                <div className='p-5 rounded-2xl border bg-blue-50'>
                    <p className='text-3xl font-bold text-blue-600'>{adopted}</p>
                    <p className='text-gray-500 text-sm'>Adopted</p>
                </div>

            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                {petOwner.map((pet) => (
                    <div
                        key={pet._id}
                        className='border rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-md transition'
                    >

                        <div className='relative h-48'>
                            <Image
                                src={pet.imageUrl}
                                alt={pet.petName}
                                fill
                                className='object-cover'
                            />
                        </div>

                        <div className='p-4 space-y-3'>

                            <h2 className='text-lg font-semibold text-gray-900'>
                                {pet.petName}
                            </h2>

                            <p className='text-gray-500 text-sm'>
                                Price: ${pet.adoptionFee || 0}
                            </p>

                            <span className={`text-xs px-3 py-1 rounded-full
                                ${pet.adoptionStatus === "Adopted"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-green-100 text-green-600"
                                }`}
                            >
                                {pet.adoptionStatus}
                            </span>

                            <div className='flex flex-wrap gap-2 pt-3'>

                                <RequestsModal pet={pet} />

                                <Link href={`/all-pets/${pet._id}`}>
                                    <Button size='sm' variant='outline'>
                                        View
                                    </Button>
                                </Link>

                                {/* <Link href={`/dashboard/edit/${pet._id}`}> */}
                                    <Button size='sm' variant='secondary'>
                                        Edit
                                    </Button>
                                {/* </Link> */}

                                <Button size='sm' variant='danger'>
                                    Delete
                                </Button>

                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ListingsPage;