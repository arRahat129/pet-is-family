import React from "react";
import Marquee from "react-fast-marquee";

const TopMarquee = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption`, {
        cache: "no-store"
    });

    if (!res.ok) {
        return (
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
                Updates unavailable
            </div>
        );
    }

    const data = await res.json();

    const total = data.length;
    const pending = data.filter(i => i.status === "pending").length;
    const approved = data.filter(i => i.status === "approved").length;

    const updates = [
        `Secure adoption request system`,
        `Total requests: ${total}`,
        `Pending: ${pending}`,
        `Approved: ${approved}`,
        `Verified pet owners only`,
    ];

    return (
        <div className="bg-white dark:bg-gray-950 border border-green-500 dark:border-gray-700 px-2 md:px-0">

            <div className="max-w-7xl mx-auto flex items-center px-4 py-3 gap-4">

                <div className="shrink-0">
                    <button className="bg-green-600 text-white text-sm px-4 py-1 rounded-full">
                        Latest Updates
                    </button>
                </div>

                <div className="flex-1 overflow-hidden">
                    <Marquee speed={60} gradient={false} pauseOnHover>
                        {updates.map((update, i) => (
                            <span key={i} className="mx-4 text-green-900 dark:text-gray-300 font-medium">
                                {update}
                            </span>
                        ))}
                    </Marquee>
                </div>

            </div>
        </div>
    );
};

export default TopMarquee;