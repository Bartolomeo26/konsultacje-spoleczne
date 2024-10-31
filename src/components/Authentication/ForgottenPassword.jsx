import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../../util/fetch';
import classes from '../../styles/Authentication.module.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import ForgottenPasswordForm from '../Forms/ForgottenPasswordForm';


function ForgottenPassword({ changeAuthType })
{
    const [confirmationInfo, setConfirmationInfo] = useState(false);
    const navigate = useNavigate();

    const { mutateAsync, isPending, isError, error } = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => setConfirmationInfo(true)

    });

    async function handleSubmit(formData)
    {
        await mutateAsync(formData);
    }

    return (
        <div className="flex flex-col items-center mt-5 border-2 bg-slate-200 bg-opacity-70 rounded-lg p-8 px-4 mb-10">
            <h1 className='mb-5 text-3xl'>You have forgotten your password?</h1>
            <ForgottenPasswordForm onSubmit={handleSubmit}>
                {isPending ? (
                    <button type="submit" disabled className={classes.button}>
                        Submitting...
                    </button>
                ) : (
                    <button type="submit" className={classes.button}>
                        Reset Password
                    </button>
                )}
            </ForgottenPasswordForm>
            {confirmationInfo && <h1 className='text-green-400 font-semibold mb-3'>Check your email for the new password.</h1>}
            {isError && (
                <h1 className='text-red-500 font-semibold mb-3'>
                    {error.info ? (typeof error.info === 'string'
                        ? error.info
                        : error.info?.title
                    ) : error.message}
                </h1>
            )}
            <div className='flex gap-2 mt-3'>
                <button onClick={() => changeAuthType('signup')} className={classes.secondaryButton}>
                    I don't have an account
                </button>
                <button onClick={() => changeAuthType('login')} className={classes.secondaryButton}>
                    I already have an account
                </button>
            </div>
        </div>
    );
}

export default ForgottenPassword;
