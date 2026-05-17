import React from "react";

const WhyAdopt = () => {
    return (
        <section className="bg-green-50 py-16">
            <div className="max-w-7xl mx-auto px-4">

                <h2 className="text-3xl font-bold text-green-900 text-center">
                    Why Adopt Pets?
                </h2>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="font-semibold text-green-900">Save a Life</h3>
                        <p className="text-sm text-green-700 mt-2">
                            Adoption gives homeless pets a second chance to live happily.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="font-semibold text-green-900">Reduce Overcrowding</h3>
                        <p className="text-sm text-green-700 mt-2">
                            You help reduce shelter overcrowding and animal suffering.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="font-semibold text-green-900">Loyal Companions</h3>
                        <p className="text-sm text-green-700 mt-2">
                            Adopted pets often show deep loyalty and love.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyAdopt;