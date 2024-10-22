function AuthForm({ inputData, onSubmit, children })
{

    function handleSubmit(event)
    {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        onSubmit({ ...data });
    }

    return (
        <form id="event-form" onSubmit={handleSubmit} className="mb-5 flex flex-col items-center">
            <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={inputData?.name ?? ''}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900">Surname</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    id="surname"
                    name="surname"
                    defaultValue={inputData?.surname ?? ''}
                />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={inputData?.email ?? ''}
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="password"
                    id="password"
                    name="password"
                    defaultValue={inputData?.password ?? ''}
                />
            </div>


            <p className="form-actions">{children}</p>
        </form>
    );
}

export default AuthForm;