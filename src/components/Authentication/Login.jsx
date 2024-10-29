import LoginForm from '../Forms/LoginForm';
import { useMutation } from '@tanstack/react-query';
import { LogIn } from '../../util/fetch';
import classes from '../../styles/Authentication.module.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';


function Login({ changeAuthType })
{
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { mutateAsync, isPending, isError, error } = useMutation({
        mutationFn: LogIn,
        onSuccess: (token) =>
        {
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
        }
    });
    if (isLoggedIn)
    {
        return <Navigate to="/" replace />;
    }
    async function handleSubmit(formData)
    {
        await mutateAsync({ user: formData });
    }

    return (
        <div className="flex flex-col items-center mt-5 border-2 bg-slate-200 bg-opacity-70 rounded-lg p-8 px-4 mb-10">
            <h1 className='mb-5 text-3xl'>Login</h1>
            <LoginForm onSubmit={handleSubmit}>
                {isPending ? (
                    <button type="submit" disabled className={classes.button}>
                        Submitting...
                    </button>
                ) : (
                    <button type="submit" className={classes.button}>
                        Log in
                    </button>
                )}
            </LoginForm>
            {isError && (
                <h1 className='text-red-500 font-semibold mb-3'>
                    {error.info ? (typeof error.info === 'string'
                        ? error.info
                        : error.info?.title
                    ) : error.message}
                </h1>
            )}
            <button onClick={() => changeAuthType('signup')} className={classes.button}>
                I don't have an account
            </button>
        </div>
    );
}

export default Login;
