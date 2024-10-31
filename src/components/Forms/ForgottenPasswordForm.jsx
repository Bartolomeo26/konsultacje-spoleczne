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



            <p className="form-actions">{children}</p>
        </form>
    );
}

export default ForgottenPasswordForm;