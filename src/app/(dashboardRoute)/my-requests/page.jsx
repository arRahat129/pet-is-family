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
            <div className="max-w-7xl mx-auto px-4 py-10 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center">
                <h2 className="text-xl font-semibold text-red-500 dark:text-red-400">
                    Please login to view your requests
                </h2>
            </div>
        );
    }

    const { token } = await auth.api.getToken({
        headers: await headers()
    });

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
        return (
            <section className="py-16 text-center text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 font-medium">
                Requests temporarily unavailable
            </section>
        );
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