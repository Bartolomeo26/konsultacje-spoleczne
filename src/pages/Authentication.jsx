import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Authentication()
{
    const [authType, setAuthType] = useState('signup');

    function changeAuthType(type)
    {
        setAuthType(type);
    }

    const variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 },
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {authType === 'signup' ? (
                    <motion.div
                        key="signup"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        transition={{ duration: 0.5 }}
                        className="w-1/3"
                    >
                        <Signup changeAuthType={changeAuthType} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="login"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        transition={{ duration: 0.5 }}
                        className="w-1/3"
                    >
                        <Login changeAuthType={changeAuthType} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Authentication;
