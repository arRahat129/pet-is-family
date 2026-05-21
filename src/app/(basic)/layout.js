import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function BasicLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black">
            <Navbar />
            <main className="w-full max-w-7xl mx-auto px-4 flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}