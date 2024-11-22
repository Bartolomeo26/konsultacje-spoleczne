function CommunityMain({ community })
{
    return (
        <>
            <div className="flex flex-col w-full">
                <div className="w-4/5 flex flex-col justify-center p-6 mt-10">
                    <h1 className='text-2xl mb-3 font-bold'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block mb-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                    </svg>Description</h1>
                    <p className='text-xl w-3/4'>{community.description}</p>
                </div>

            </div>
        </>
    )
}

export default CommunityMain;