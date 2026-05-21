import React from "react";
import { Heart, ShieldCheck, Smile } from "lucide-react";

const WhyAdopt = () => {
    return (
        <section className="bg-green-50/50 dark:bg-neutral-950 py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-green-900 dark:text-white tracking-tight">
                        Why Adopt Pets?
                    </h2>
                    <p className="text-sm text-green-700/80 dark:text-neutral-400 mt-2">
                        Choosing adoption changes lives—both yours and theirs. Here is why it matters.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Card 1: Save a Life */}
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-green-100/50 dark:border-neutral-800 shadow-sm transition-all hover:shadow-md">
                        <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/40 flex items-center justify-center text-green-800 dark:text-green-400 mb-4">
                            <Heart size={20} fill="currentColor" className="dark:fill-none" />
                        </div>
                        <h3 className="font-semibold text-green-900 dark:text-white text-lg">
                            Save a Life
                        </h3>
                        <p className="text-sm text-green-700 dark:text-neutral-400 mt-2 leading-relaxed">
                            Adoption gives homeless pets a second chance to live happily in a safe environment.
                        </p>
                    </div>

                    {/* Card 2: Reduce Overcrowding */}
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-green-100/50 dark:border-neutral-800 shadow-sm transition-all hover:shadow-md">
                        <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/40 flex items-center justify-center text-green-800 dark:text-green-400 mb-4">
                            <ShieldCheck size={20} />
                        </div>
                        <h3 className="font-semibold text-green-900 dark:text-white text-lg">
                            Reduce Overcrowding
                        </h3>
                        <p className="text-sm text-green-700 dark:text-neutral-400 mt-2 leading-relaxed">
                            You help reduce shelter overcrowding, lowering operational strain and animal suffering.
                        </p>
                    </div>

                    {/* Card 3: Loyal Companions */}
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-green-100/50 dark:border-neutral-800 shadow-sm transition-all hover:shadow-md">
                        <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/40 flex items-center justify-center text-green-800 dark:text-green-400 mb-4">
                            <Smile size={20} />
                        </div>
                        <h3 className="font-semibold text-green-900 dark:text-white text-lg">
                            Loyal Companions
                        </h3>
                        <p className="text-sm text-green-700 dark:text-neutral-400 mt-2 leading-relaxed">
                            Adopted pets often show deep loyalty and unconditional love to their rescuer.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyAdopt;