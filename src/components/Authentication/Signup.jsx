import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createNewUser } from '../../util/fetch.js';

import AuthForm from '../Forms/AuthForm.jsx';
import classes from '../../styles/DefaultForm.module.css';
import { useState } from 'react';
function Signup({ changeAuthType })
{
    const navigate = useNavigate();
    const [confirmationInfo, setConfirmationInfo] = useState(false)

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewUser,
        onSuccess: () => setConfirmationInfo(true)
    });

    function handleSubmit(formData)
    {
        mutate({ user: formData });
    }
    return (<>
        {confirmationInfo ? <div className="mt-10">
            <h1 className="text-xl text-centre">A confirmation link has been sent to your email. Click it in order to confirm your account!</h1>
        </div> : <div className="flex flex-col items-center mt-5 border-2  bg-slate-200 bg-opacity-70 rounded-lg p-8 px-4 mb-10">
            <h1 className='mb-5 text-3xl'>Register</h1>
            <AuthForm onSubmit={handleSubmit}>
                {isPending && (
                    <>
                        <button type="submit" disabled className={classes.button}>
                            Submitting...
                        </button>
                    </>
                )}
                {!isPending && (
                    <>
                        <button type="submit" className={classes.button}>
                            Sign In
                        </button>
                    </>
                )}
            </AuthForm>
            {isError && (
                <h1 className='text-red-500 font-semibold mb-3'>
                    {error.info ? (typeof error.info === 'string'
                        ? error.info  // jeśli to string, po prostu wyświetl
                        : error.info?.title  // jeśli to obiekt, wyświetl np. pole `title`
                    ) : error.message}
                </h1>
            )}
            <button onClick={() => changeAuthType('login')} className={classes.secondaryButton}>I already have an account</button>
        </div>}

    </>)
}

export default Signup;