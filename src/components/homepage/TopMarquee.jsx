import React from "react";
import Marquee from "react-fast-marquee";

const TopMarquee = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption`);
    const data = await res.json();
    // console.log(data);

    const total = data.length;

    const pending = data.filter(item => item.status === "pending").length;
    const approved = data.filter(item => item.status === "approved").length;

    const updates = [
        `Secure adoption request system`,
        `Total requests: ${total}`,
        `All pets are verified before listing`,
        `Pending: ${pending}`,
        `Health & vaccination records are checked`,
        `Approved: ${approved}`,
        `Verified pet owners only`,
    ];

    return (
        <div className="bg-white border border-green-500 px-2 md:px-0">

            <div className="max-w-7xl mx-auto flex items-center px-4 py-3 gap-4">

                <div className="shrink-0">
                    <button className="bg-green-600 text-white text-sm px-4 py-1 rounded-full">
                        Latest Updates
                    </button>
                </div>

                <div className="flex-1 overflow-hidden">
                    <Marquee
                        speed={60}
                        gradient={false}
                        pauseOnHover={true}
                    >
                        {
                            updates.map((update, i) => (
                                <span key={i} className="mx-4 text-green-900 font-medium">
                                    {update}
                                </span>
                            ))
                        }
                    </Marquee>
                </div>

            </div>
        </div>
    );
};

export default TopMarquee;