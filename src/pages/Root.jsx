import Footer from "../components/Footer";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";

function RootLayout()
{
    return (
        <>
            <ScrollToTop />
            <MainNavigation />
            <div className="flex justify-center align-center">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default RootLayout;