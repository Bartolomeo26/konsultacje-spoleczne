import DiscussionCard from "./DiscussionCard";

const consultations = [
    {
        topic: "Solving Parking Problems in Piaski",
        description: "This discussion will focus on the persistent parking issues in the Piaski area, particularly the lack of available spaces for residents. Participants will explore possible solutions, such as creating new parking zones or redesigning existing spaces to improve accessibility and reduce congestion.",
        date: "28.10.2023",
        status: "Ending"
    },
    {
        topic: "How can we improve transportation in Piaski?",
        description: "We want to hear your ideas on upgrading Piaski's transportation network. Do you think we need more bus routes or better bike lanes? Share your thoughts on how we can make commuting easier for everyone.",
        date: "21.08.2024",
        status: "Resolved"
    },
    {
        topic: "How would you like to see Piaski's parks improved? How would you like to see Piaski's parks improved?",
        description: "Piaski is planning to revitalize its parks and recreational areas. Would you like more green spaces, playgrounds, or outdoor fitness zones? Let us know how we can make Piaski a greener, healthier place to live.",
        date: "05.04.2024",
        status: "Ongoing"
    },
]

function CommunityconsultationsList()
{
    return (
        <>
            <div className="flex flex-col w-3/4 ">
                <div className="flex">
                    <div className="w-4/5 flex flex-col justify-center p-6 mt-10">
                        <div className="flex justify-between">
                            <h1 className='text-2xl mb-3 font-bold'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block mb-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg> Consultations</h1>
                            <form className="max-w-sm">
                                <select id="small" className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option defaultValue={""}>Sort</option>
                                    <option value="recent">Recent</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="most-answers">Most answers</option>
                                    <option value="least-answers">Least answers</option>
                                </select>
                            </form>
                        </div>
                        <div>
                            <DiscussionCard discussion={consultations[0]} />
                            <DiscussionCard discussion={consultations[1]} />
                            <DiscussionCard discussion={consultations[2]} />
                            <DiscussionCard discussion={consultations[1]} />
                            <DiscussionCard discussion={consultations[2]} />
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default CommunityconsultationsList;