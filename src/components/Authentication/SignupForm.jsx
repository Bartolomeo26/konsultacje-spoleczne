import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createNewUser } from '../../util/fetch.js';

import AuthForm from '../Forms/AuthForm.jsx';
import classes from '../../styles/Authentication.module.css';
function SignupForm({ changeAuthType })
{
    const navigate = useNavigate();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewUser,
    });

    function handleSubmit(formData)
    {
        mutate({ user: formData });
    }
    return (<>
        <div className="flex flex-col items-center mt-5 border-2 border-slate-400 rounded-lg p-10 px-4 w-1/4 mb-10">
            <h1 className='mb-5 text-3xl'>Register</h1>
            <AuthForm onSubmit={handleSubmit}>
                {isPending && 'Submitting...'}
                {!isPending && (
                    <>
                        <button type="submit" className={classes.button}>
                            Sign Up
                        </button>
                    </>
                )}
            </AuthForm>
            {isError && (
                <h1>
                    {typeof error.info === 'string'
                        ? error.info  // jeśli to string, po prostu wyświetl
                        : error.info?.title  // jeśli to obiekt, wyświetl np. pole `title`
                    }
                </h1>
            )}
            <button onClick={() => changeAuthType('login')} className={classes.button}>I already have an account</button>
        </div>
    </>)
}

export default SignupForm;