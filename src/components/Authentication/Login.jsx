import LoginForm from '../Forms/LoginForm';
import { useMutation } from '@tanstack/react-query';
import { createNewUser } from '../../util/fetch';
import classes from '../../styles/Authentication.module.css';
function Login({ changeAuthType })
{
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewUser,
    });
    function handleSubmit(formData)
    {
        mutate({ user: formData });
    }
    return (<>
        <div className="flex flex-col items-center mt-5 border-2 bg-slate-200 bg-opacity-70 rounded-lg p-8 px-4 mb-10">
            <h1 className='mb-5 text-3xl'>Login</h1>
            <LoginForm onSubmit={handleSubmit}>
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
            </LoginForm>
            {isError && (
                <h1 className='text-red-500 font-semibold mb-3'>
                    {error.info ? (typeof error.info === 'string'
                        ? error.info  // jeśli to string, po prostu wyświetl
                        : error.info?.title  // jeśli to obiekt, wyświetl np. pole `title`
                    ) : error.message}
                </h1>
            )}
            <button onClick={() => changeAuthType('signup')} className={classes.button}> I don't have an account</button>
        </div>
    </>)
}

export default Login;