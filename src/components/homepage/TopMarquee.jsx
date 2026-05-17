"use client";

import React from "react";
import Marquee from "react-fast-marquee";

const TopMarquee = () => {
    return (
        <div className="bg-white border-b border-green-100 px-2 md:px-0">

            <div className="max-w-7xl mx-auto flex items-center px-4 py-3 gap-4">

                <div className="shrink-0">
                    <button className="bg-green-600 text-white text-sm px-4 py-1 rounded-full">
                        Latest Updates
                    </button>
                </div>

                <div className="flex-1 overflow-hidden">
                    <Marquee
                        speed={45}
                        gradient={false}
                        pauseOnHover={true}
                    >
                        <span className="mx-8 text-green-900 font-medium">
                            🐶 Adopt, don’t shop — give a pet a loving home
                        </span>

                        <span className="mx-8 text-green-900 font-medium">
                            🐱 New rescued pets available for adoption this week
                        </span>

                        <span className="mx-8 text-green-900 font-medium">
                            ❤️ Your donation helps save animal lives
                        </span>

                        <span className="mx-8 text-green-900 font-medium">
                            🐾 Every pet deserves care, love, and safety
                        </span>
                    </Marquee>
                </div>

            </div>
        </div>
    );
};

export default TopMarquee;