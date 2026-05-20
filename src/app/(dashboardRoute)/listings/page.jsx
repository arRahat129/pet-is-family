import EditPetModal from '@/components/modals/EditPetModal';
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

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet/owner/${user.id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    
    const petOwner = await res.json();

    console.log(petOwner);

    const total = petOwner.length;

    const adopted = petOwner.filter(p => p.adoptionStatus.toLowerCase() === "adopted").length;
    const available = petOwner.filter(p => p.adoptionStatus.toLowerCase() === "available").length;
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-10'>

            <div className='mb-10'>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight'>
                    My Listings
                </h1>
                <p className='text-gray-500 dark:text-gray-400 mt-2 text-sm'>
                    Manage your pets and adoption requests.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10'>
                <div className='p-5 rounded-2xl border bg-white dark:bg-neutral-900 shadow-sm dark:border-neutral-800'>
                    <p className='text-3xl font-extrabold text-gray-900 dark:text-white'>{total}</p>
                    <p className='text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1'>Total Listings</p>
                </div>

                <div className='p-5 rounded-2xl border bg-green-50/50 dark:bg-emerald-950/10 border-green-100 dark:border-emerald-900/30'>
                    <p className='text-3xl font-extrabold text-green-600 dark:text-emerald-400'>{available}</p>
                    <p className='text-green-700/70 dark:text-emerald-500/70 text-xs font-semibold uppercase tracking-wider mt-1'>Available</p>
                </div>

                <div className='p-5 rounded-2xl border bg-blue-50/50 dark:bg-blue-950/10 border-blue-100 dark:border-blue-900/30'>
                    <p className='text-3xl font-extrabold text-blue-600 dark:text-blue-400'>{adopted}</p>
                    <p className='text-blue-700/70 dark:text-blue-500/70 text-xs font-semibold uppercase tracking-wider mt-1'>Adopted</p>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {petOwner.map((pet) => (
                    <div
                        key={pet._id}
                        className='border border-gray-200 dark:border-neutral-800 rounded-3xl bg-white dark:bg-neutral-900 shadow-sm overflow-hidden hover:shadow-md transition duration-300 flex flex-col'
                    >
                        <div className='relative h-48 bg-neutral-100 dark:bg-neutral-800'>
                            <Image
                                src={pet.imageUrl}
                                alt={pet.petName}
                                fill
                                className='object-cover'
                            />
                        </div>

                        <div className='p-5 flex-1 flex flex-col justify-between space-y-4'>
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <h2 className='text-xl font-bold text-gray-900 dark:text-white tracking-tight'>
                                        {pet.petName}
                                    </h2>
                                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider
                                        ${pet.adoptionStatus.toLowerCase() === "adopted"
                                            ? "bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                                            : "bg-green-100 dark:bg-emerald-950/40 text-green-600 dark:text-emerald-400"
                                        }`}
                                    >
                                        {pet.adoptionStatus}
                                    </span>
                                </div>
                                <p className='text-gray-500 dark:text-neutral-400 text-sm font-semibold'>
                                    Adoption Fee: <span className="text-gray-800 dark:text-gray-200">${pet.adoptionFee || 0}</span>
                                </p>
                            </div>

                            <div className='grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-neutral-800/80'>

                                <RequestsModal pet={pet} />

                                <Link href={`/all-pets/${pet._id}`} className="w-full">
                                    <Button size='sm' variant='outline' className='w-full font-semibold rounded-xl border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-300'>
                                        View
                                    </Button>
                                </Link>


                                <EditPetModal pet={pet} />

                                <Button size='sm' variant='danger' className='w-full font-bold rounded-xl'>
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