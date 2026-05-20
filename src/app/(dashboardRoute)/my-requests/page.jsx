import MyRequestsClient from '@/components/client/MyRequestsClient';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyRequestsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <h2 className="text-xl font-semibold text-red-500">
                    Please login to view your requests
                </h2>
            </div>
        );
    }

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption/adopter/${user.id}`,
        {
            cache: "no-store",
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const myRequests = await res.json();

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
        <MyRequestsClient
            myRequests={myRequests}
            stats={{ total, pending, approved, rejected }}
        />
    );
};

export default MyRequestsPage;