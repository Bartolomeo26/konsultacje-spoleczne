import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../../util/fetch";
import classes from "../../../styles/DefaultForm.module.css"
import { useQueryClient } from "@tanstack/react-query";

function PasswordChange({ userId })
{
    const queryClient = useQueryClient();
    const [confirmationInfo, setConfirmationInfo] = useState(false)

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => { setConfirmationInfo(true); queryClient.invalidateQueries(['user', userId]); }
    });

    function handleSubmit(event)
    {
        event.preventDefault();

        const formData = new FormData(event.target);
        console.log(formData);
        const data = Object.fromEntries(formData);
        mutate({ ...data, userId });
    }

    const [visibility, setVisibility] = useState({ password: false, passwordConfirm: false });
    const [enteredData, setEnteredData] = useState({
        password: '',
        confirmPassword: '',
    })
    const [didEdit, setDidEdit] = useState({
        password: false,
        confirmPassword: false,
    })

    function handleInputBlur(type)
    {
        setDidEdit(prevEdit => ({
            ...prevEdit,
            [type]: true
        }))
    }
    function handleInputChange(type, value)
    {
        setEnteredData((prevData) => ({
            ...prevData,
            [type]: value
        }))
        setDidEdit(prevEdit => ({
            ...prevEdit,
            [type]: false
        }))
    }
    function changeVisibility(type)
    {

        setVisibility(prevVisibility => ({ ...prevVisibility, [type]: !prevVisibility[type] }));
    }
    let passwordIsInvalid = didEdit.password && enteredData.password.length < 7;
    let confirmPasswordIsInvalid = didEdit.confirmPassword && enteredData.password != enteredData.confirmPassword;
    return (
        <form id="password-change-form" onSubmit={handleSubmit} className="mb-2 flex flex-col w-full px-7 py-2">

            <div className="mb-3 w-1/2">
                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900">Password</label>
                <div className="relative">
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type={visibility.password ? 'text' : 'password'}
                        id="password"
                        name="password"
                        maxLength={20}
                        onChange={() => handleInputChange('password', event.target.value)}
                        onBlur={() => handleInputBlur('password')}


                    />
                    {visibility.password ? <svg onClick={() => changeVisibility('password')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 z-10 text-slate-600 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg> : <svg onClick={() => changeVisibility('password')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 z-10 text-slate-600 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>}

                </div>
                {passwordIsInvalid && <p className="text-sm text-red-600">Password has to have at least 7 characters</p>}
            </div>
            <div className="mb-3 w-1/2">
                <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-900">Confirm Password</label>
                <div className="relative">
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type={visibility.passwordConfirm ? 'text' : 'password'}
                        id="confirmPassword"
                        maxLength={20}
                        onChange={() => handleInputChange('confirmPassword', event.target.value)}
                        onBlur={() => handleInputBlur('confirmPassword')}
                        value={enteredData.confirmPassword}

                    />
                    {visibility.passwordConfirm ? <svg onClick={() => changeVisibility('passwordConfirm')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 z-10 text-slate-600 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg> : <svg onClick={() => changeVisibility('passwordConfirm')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 z-10 text-slate-600 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>}

                </div>
                {confirmPasswordIsInvalid && <p className="text-sm text-red-600">Your passwords are different</p>}
            </div>

            <p className="form-actions">{isPending && (
                <>
                    <button type="submit" disabled className={classes.button}>
                        Submitting...
                    </button>
                </>
            )}
                {!isPending && (
                    <>
                        <button type="submit" className={classes.button}>
                            Change Password
                        </button>
                    </>
                )}</p>
            <div className="mt-1">
                {confirmationInfo && <h1 className='text-green-400 font-semibold mb-3'>You have successfuly changed your password.</h1>}
                {isError && (
                    <h1 className='text-red-500 font-semibold mb-3'>
                        {error.info ? (typeof error.info === 'string'
                            ? error.info
                            : error.info?.title
                        ) : error.message}
                    </h1>
                )}
            </div>
        </form>);
}

export default PasswordChange;