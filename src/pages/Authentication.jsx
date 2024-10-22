import { useState } from "react";

import LoginForm from "../components/Authentication/LoginForm";
import SignupForm from "../components/Authentication/SignupForm";

function Authentication()
{
    const [authType, setAuthType] = useState('signup');
    function changeAuthType(type)
    {
        setAuthType(type);
    }
    return (<>
        {authType === 'signup' ? <SignupForm changeAuthType={changeAuthType} /> : <LoginForm changeAuthType={changeAuthType} />}
    </>)
}
export default Authentication;