import { Poppins, Nunito } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata = {
    title: "PetIsFamily",
    description: "Pet adoption platform",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${poppins.className} ${nunito.className} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Navbar />
                <main className="w-full max-w-7xl mx-auto px-4 flex-1">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
