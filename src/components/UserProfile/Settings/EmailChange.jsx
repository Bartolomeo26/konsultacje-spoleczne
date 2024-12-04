import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateEmail } from "../../../util/fetch";
import classes from "../../../styles/DefaultForm.module.css"
import { useQueryClient } from "@tanstack/react-query";

function EmailChange({ userId })
{
    const queryClient = useQueryClient();
    const [confirmationInfo, setConfirmationInfo] = useState(false)

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: updateEmail,
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

    const [enteredData, setEnteredData] = useState({
        email: '',
        confirmEmail: '',
    })
    const [didEdit, setDidEdit] = useState({
        email: false,
        confirmEmail: false,
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

    let emailIsInvalid = didEdit.email && !enteredData.email.includes('@');
    let confirmEmailIsInvalid = didEdit.confirmEmail && enteredData.email != enteredData.confirmEmail;
    return (
        <form id="email-change-form" onSubmit={handleSubmit} className="mb-2 flex flex-col w-full px-7 py-2">

            <div className="mb-3 lg:w-1/2">
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">Email</label>
                <div className="relative">
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type='email'
                        id="email"
                        name="email"

                        onChange={() => handleInputChange('email', event.target.value)}
                        onBlur={() => handleInputBlur('email')}


                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>

                </div>
                {emailIsInvalid && <p className="text-sm text-red-600">Please type a correct email</p>}
            </div>
            <div className="mb-3 lg:w-1/2">
                <label htmlFor="confirmEmail" className="block mb-1 text-sm font-medium text-gray-900">Confirm email</label>
                <div className="relative">
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type='email'
                        id="confirmEmail"

                        onChange={() => handleInputChange('confirmEmail', event.target.value)}
                        onBlur={() => handleInputBlur('confirmEmail')}
                        value={enteredData.confirmEmail}

                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>

                </div>
                {confirmEmailIsInvalid && <p className="text-sm text-red-600">Your emails are different</p>}
            </div>

            <p className="form-actions flex md:inline-block justify-center">{isPending && (
                <>
                    <button type="submit" disabled className={classes.button}>
                        Submitting...
                    </button>
                </>
            )}
                {!isPending && (
                    <>
                        <button type="submit" className={classes.button}>
                            Change Email
                        </button>
                    </>
                )}</p>
            <div className="mt-1">
                {confirmationInfo && <h1 className='text-green-400 font-semibold mb-3'>You have successfuly changed your email.</h1>}
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

export default EmailChange;

