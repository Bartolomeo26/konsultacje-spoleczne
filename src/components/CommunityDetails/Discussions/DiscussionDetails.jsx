import { Link } from "react-router-dom";

function DiscussionDetails()
{
    return (<>
        <div className="flex flex-col w-3/4 mt-10">
            <Link to="/communities/1/discussions">
                <div className="rounded-3xl p-1 bg-slate-400 inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </div>
            </Link>
            <div className="border-2 rounded-lg border-slate-400 p-5">
                <p className="text-md">Andrzej Nowicki</p>
                <h1 className="text-4xl">How can we improve transportation in Piaski?</h1>
                <p className="text-xl mt-4">I was wondering if I'm the only one hating Opałek for occupying the great location in the heart of Piaski despite the fact that it's got terrible prices! Not to mention that the building itself is looking hideous. Let's destroy this.</p>
            </div>
            <div>
                <h1 className="text-2xl mt-2">Answers:</h1>
            </div>
        </div>
    </>)
}

export default DiscussionDetails;