import AboutProject from "../components/AboutProject";
import HomeBanner from "../components/HomeBanner";
import Map from "../components/Map";
import SuggestedCommunities from "../components/SuggestedCommunities";

function HomePage()
{
    return <>
        <div className="flex justify-center align-top items-center flex-col w-full mt-10 lg:mt-0">
            <HomeBanner />
            <AboutProject />
            <SuggestedCommunities />
            <Map />
        </div>
    </>
}
export default HomePage;