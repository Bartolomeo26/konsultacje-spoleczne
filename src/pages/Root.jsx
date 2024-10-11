import Footer from "../components/Footer";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";

function RootLayout()
{
    return (
        <>
            <MainNavigation />
            <Outlet />
            <Footer />
        </>
    );
}

export default RootLayout;