import SurveyCard from "./SurveyCard";

function SurveysList()
{
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex">
                    <div className="w-4/5 flex flex-col justify-center p-6 mt-10">
                        <div className="flex justify-between">
                            <h1 className='text-2xl mb-3 font-bold'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block mb-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                            </svg> Surveys</h1>
                            <form className="max-w-sm">
                                <select id="small" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
                                    <option defaultValue={""}>Sort</option>
                                    <option value="recent">Recent</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="most-answers">Most answers</option>
                                    <option value="least-answers">Least answers</option>
                                </select>
                            </form>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            <SurveyCard />
                            <SurveyCard />
                            <SurveyCard />


                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default SurveysList;