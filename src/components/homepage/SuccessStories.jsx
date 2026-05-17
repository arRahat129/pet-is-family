import React from "react";

const SuccessStories = () => {
    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">

                <h2 className="text-3xl font-bold text-green-900 text-center">
                    Success Stories
                </h2>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="border rounded-xl p-6 text-center md:text-left">
                        <p className="text-green-700 text-sm">
                            “We adopted Bruno and he changed our life. He is now part of our family.”
                        </p>
                        <p className="mt-4 font-semibold text-green-900">— Rahim Family</p>
                    </div>

                    <div className="border rounded-xl p-6 text-center md:text-left">
                        <p className="text-green-700 text-sm">
                            “Luna was rescued from the street. Now she’s healthy and happy.”
                        </p>
                        <p className="mt-4 font-semibold text-green-900">— Ayesha</p>
                    </div>

                    <div className="border rounded-xl p-6 text-center md:text-left">
                        <p className="text-green-700 text-sm">
                            “Adoption was the best decision we made as a family.”
                        </p>
                        <p className="mt-4 font-semibold text-green-900">— Karim Family</p>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default SuccessStories;