import { useState } from "react";

function LoginForm({ inputData, onSubmit, children })
{

    const [visibility, setVisibility] = useState(false);

    function handleSubmit(event)
    {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        onSubmit({ ...data });
    }

    function changeVisibility()
    {

        setVisibility(prevVisibility => !prevVisibility);
    }

    return (
        <form id="event-form" onSubmit={handleSubmit} className="mb-2 flex flex-col items-center w-full">

            <div className="mb-6 w-1/2">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <div className="relative">
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type="email"
                        id="email"
                        name="email"

                        defaultValue={inputData?.email ?? ''}


                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                </div>


            </div>
            <div className="mb-6 w-1/2">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <div className="relative">
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type={visibility ? 'text' : 'password'}
                        id="password"
                        name="password"
                        defaultValue={inputData?.password ?? ''}
                    />
                    {visibility ? <svg onClick={changeVisibility} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 z-10 text-slate-600 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg> : <svg onClick={changeVisibility} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 z-10 text-slate-600 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>}

                </div>
            </div>


            <p className="form-actions">{children}</p>
        </form>
    );
}

export default LoginForm;