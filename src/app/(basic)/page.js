import Banner from "@/components/homepage/Banner";
import FeaturedPets from "@/components/homepage/FeaturedPets";
import HowWeHelp from "@/components/homepage/HowWeHelp";
import PetCareTips from "@/components/homepage/PetCareTips";
import SuccessStories from "@/components/homepage/SuccessStories";
import TopMarquee from "@/components/homepage/TopMarquee";
import WhyAdopt from "@/components/homepage/WhyAdopt";

export default function Home() {
    return (
        <div>
            <Banner />
            <TopMarquee />
            <FeaturedPets />
            <WhyAdopt />
            <SuccessStories />
            <PetCareTips />
            <HowWeHelp />
        </div>
    );
}
