import AuthForm from '../Forms/AuthForm';
import { useMutation } from '@tanstack/react-query';
import { createNewUser } from '../../util/fetch';
import classes from '../../styles/Authentication.module.css';
function LoginForm({ changeAuthType })
{
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewUser,
    });
    function handleSubmit(formData)
    {
        mutate({ user: formData });
    }
    return (<>
        <div className="flex flex-col items-center mt-5 border-2 border-slate-400 rounded-lg p-10 w-1/4 mb-10">
            <h1 className='mb-3'>Login</h1>
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
            <button onClick={() => changeAuthType('signup')} className={classes.button}> I don't have an account</button>
        </div>
    </>)
}

export default LoginForm;