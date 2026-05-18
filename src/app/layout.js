import { Poppins, Nunito } from "next/font/google";
import "./globals.css"; // Double check if this path needs to be "../globals.css" or "./globals.css" depending on your exact folder depth
import { Toaster } from "react-hot-toast";

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
            <body className="min-h-full bg-white">
                {children}
                <Toaster />
            </body>
        </html>
    );
}