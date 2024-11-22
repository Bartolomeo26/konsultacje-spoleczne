import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../util/AuthContext";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import ForgottenPassword from "../components/Authentication/ForgottenPassword";

function Authentication()
{
    const [authType, setAuthType] = useState('signup');
    const { token } = useAuth();

    if (token)
    {
        return <h1 className="text-2xl mt-5 text-center">Someone is already logged in!</h1>
    }

    function changeAuthType(type)
    {
        setAuthType(type);
    }

    const variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 },
    };

    const renderContent = () =>
    {
        const commonProps = {
            initial: "hidden",
            animate: "visible",
            exit: "exit",
            variants,
            transition: { duration: 0.5 },
            className: "w-full md:w-[400px] lg:w-1/3 px-4"
        };

        switch (authType)
        {
            case 'login':
                return (
                    <motion.div key="login" {...commonProps}>
                        <Login changeAuthType={changeAuthType} />
                    </motion.div>
                );
            case 'forgottenPassword':
                return (
                    <motion.div key="forgottenPassword" {...commonProps}>
                        <ForgottenPassword changeAuthType={changeAuthType} />
                    </motion.div>
                );
            default:
                return (
                    <motion.div key="signup" {...commonProps}>
                        <Signup changeAuthType={changeAuthType} />
                    </motion.div>
                );
        }
    };

    return (
        <div className=" flex w-full justify-center items-center justify-center bg-gray-100 p-4">
            <div className="w-full flex justify-center">
                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Authentication;