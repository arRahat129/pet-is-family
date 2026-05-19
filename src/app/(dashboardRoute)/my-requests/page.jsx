import { auth } from '@/lib/auth';
import { Button } from '@heroui/react';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const MyRequestsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    // console.log(session);
    const user = session?.user;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption/${user.id}`);

    const myRequests = await res.json();
    // console.log(myRequests);
    // adopterEmail
    // adopterId
    // adopterImage
    // adopterName
    // createdAt
    // message
    // ownerEmail
    // ownerName
    // ownerId
    // petId
    // petImage
    // petName
    // pickupDate
    // status
    // _id

    const total = myRequests.length;

    const pending = myRequests.filter(
        r => r.status?.toLowerCase() === "pending"
    ).length;

    const approved = myRequests.filter(
        r => r.status?.toLowerCase() === "approved"
    ).length;

    const rejected = myRequests.filter(
        r => r.status?.toLowerCase() === "rejected"
    ).length;
    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-10'>

            {/* HEADER */}
            <div className='mb-10'>
                <span className='px-3 py-1 text-xs rounded-full bg-pink-100 text-pink-600 border border-pink-200'>
                    📋 My Requests
                </span>

                <h1 className='text-3xl sm:text-4xl font-bold mt-3 text-gray-900'>
                    My Adoption Requests
                </h1>

                <p className='text-gray-500 mt-2 text-sm sm:text-base'>
                    Track the status of all your adoption requests here.
                </p>
            </div>

            {/* STATS */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-10'>

                <div className='p-5 rounded-2xl border bg-white shadow-sm'>
                    <p className='text-3xl font-bold text-gray-900'>{total}</p>
                    <p className='text-sm text-gray-500 mt-1'>Total Requests</p>
                </div>

                <div className='p-5 rounded-2xl border bg-yellow-50'>
                    <p className='text-3xl font-bold text-yellow-600'>{pending}</p>
                    <p className='text-sm text-gray-500 mt-1'>Pending</p>
                </div>

                <div className='p-5 rounded-2xl border bg-green-50'>
                    <p className='text-3xl font-bold text-green-600'>{approved}</p>
                    <p className='text-sm text-gray-500 mt-1'>Approved</p>
                </div>

                <div className='p-5 rounded-2xl border bg-red-50'>
                    <p className='text-3xl font-bold text-red-600'>{rejected}</p>
                    <p className='text-sm text-gray-500 mt-1'>Rejected</p>
                </div>

            </div>

            {/* TABLE (DESKTOP) */}
            <div className='hidden md:block rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm'>

                {/* HEADER ROW */}
                <div className='grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 text-sm text-gray-600 font-semibold'>
                    <p>Pet Name</p>
                    <p>Request Date</p>
                    <p>Pickup Date</p>
                    <p>Status</p>
                    <p className='text-right'>Actions</p>
                </div>

                {/* ROWS */}
                {myRequests.map((request) => (
                    <div
                        key={request._id}
                        className='grid grid-cols-5 gap-4 px-6 py-4 border-t border-gray-100 items-center hover:bg-gray-50 transition'
                    >

                        {/* PET NAME */}
                        <p className='font-medium text-gray-900'>
                            {request.petName}
                        </p>

                        {/* REQUEST DATE */}
                        <p className='text-sm text-gray-600'>
                            {new Date(request.createdAt).toLocaleDateString()}
                        </p>

                        {/* PICKUP DATE */}
                        <p className='text-sm text-gray-600'>
                            {new Date(request.pickupDate).toLocaleDateString()}
                        </p>

                        {/* STATUS */}
                        <div>
                            <span
                                className={`px-3 py-1 text-xs rounded-full font-semibold
                                ${request.status === "Approved"
                                        ? "bg-green-100 text-green-700"
                                        : request.status === "Rejected"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {request.status}
                            </span>
                        </div>

                        {/* ACTIONS */}
                        <div className='flex justify-end gap-2'>
                            <Link href={`/pets/${request.petId}`}>
                                <Button size='sm' variant='outline'>
                                    👁 View
                                </Button>
                            </Link>

                            {request.status.toLowerCase() !== "Approved" && (
                                <Button size='sm' variant='danger'>
                                    ✕ Cancel
                                </Button>
                            )}
                        </div>

                    </div>
                ))}
            </div>

            {/* MOBILE VIEW */}
            <div className='md:hidden space-y-4'>

                {myRequests.map((request) => (
                    <div
                        key={request._id}
                        className='border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition'
                    >

                        <div className='flex justify-between items-start'>
                            <h2 className='font-semibold text-gray-900'>
                                {request.petName}
                            </h2>

                            <span className='text-xs px-2 py-1 rounded-full bg-gray-100'>
                                {request.status}
                            </span>
                        </div>

                        <div className='mt-3 text-sm text-gray-600 space-y-1'>
                            <p>📅 Request: {new Date(request.createdAt).toLocaleDateString()}</p>
                            <p>📦 Pickup: {new Date(request.pickupDate).toLocaleDateString()}</p>
                        </div>

                        <div className='flex gap-2 mt-4'>
                            <Link href={`/pets/${request.petId}`} className='w-full'>
                                <Button size='sm' variant='outline' className='w-full'>
                                    View
                                </Button>
                            </Link>

                            {request.status.toLowerCase() !== "approved" && (
                                <Button size='sm' variant='danger'>
                                    Cancel
                                </Button>
                            )}
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default MyRequestsPage;