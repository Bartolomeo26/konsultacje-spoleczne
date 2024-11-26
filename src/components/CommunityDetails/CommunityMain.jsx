import { Landmark } from "lucide-react";

function CommunityMain({ community })
{
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="w-4/5 flex flex-col justify-center p-6 mt-10">
                    <h1 className='text-2xl mb-3 font-bold flex items-center gap-1'><Landmark /><span className="text-2xl">About our Community</span></h1>
                    <p className='text-xl w-3/4'>{community.description}</p>
                </div>

            </div>
        </>
    )
}

export default CommunityMain;