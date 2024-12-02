import { useState } from "react";
import { Mail } from "lucide-react";

function ForgottenPasswordForm({ inputData, onSubmit, children })
{
    function handleSubmit(event)
    {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        onSubmit({ ...data });
    }

    return (
        <form autoComplete="off"
            id="event-form"
            onSubmit={handleSubmit}
            className="mb-2 flex flex-col items-center justify-center w-full"
        >
            <div className="mb-6 w-1/2">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Email
                </label>
                <div className="relative">
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10"
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        defaultValue={inputData?.email ?? ''}
                    />
                    <Mail
                        className="absolute w-5 h-5 top-3 left-3 text-slate-600"
                    />
                </div>
            </div>

            <div className="flex justify-center w-1/2">
                <p className="form-actions">{children}</p>
            </div>
        </form>
    );
}

export default ForgottenPasswordForm;