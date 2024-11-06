import { useState } from "react";


function CommunityForm({ inputData, onSubmit, children })
{
    const [enteredData, setEnteredData] = useState({
        name: '',
        description: '',

    })


    function handleInputChange(type, value)
    {
        setEnteredData((prevData) => ({
            ...prevData,
            [type]: value
        }))
    }

    function handleSubmit(event)
    {
        event.preventDefault();



        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        console.log(data);
        onSubmit({ ...data });
    }

    return (
        <form id="event-form" onSubmit={handleSubmit} className="flex flex-col mt-7 mb-2 items-center w-full">

            <div className="mb-6 w-1/4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                <div className="relative">
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type="text"
                        id="name"
                        name="name"
                        maxLength={20}
                        onChange={() => handleInputChange('name', event.target.value)}
                        placeholder="Downtown"
                        value={enteredData.name}
                        defaultValue={inputData?.name ?? ''}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>

                </div>
            </div>

            <div className="mb-6 w-1/4">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <div className="relative">
                    <textarea
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        id="description"
                        name="description"
                        onChange={() => handleInputChange('description', event.target.value)}
                        value={enteredData.description}
                        defaultValue={inputData?.description ?? ''}
                        placeholder="Write some basic info about the community you are creating..." />
                </div>

            </div>





            <p className="form-actions">{children}</p>
        </form>
    );
}

export default CommunityForm;