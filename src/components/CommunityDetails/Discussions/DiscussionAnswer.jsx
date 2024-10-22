function DiscussionAnswer({ reply })
{
    return (<>
        <div className="border-2 flex flex-col rounded-lg border-slate-400 hover:bg-neutral-50 bg-transparent p-4 mt-1 w-3/5">
            <div>
                <p className="text-md">Stefan Stefański</p>
                <p className="text-xl mt-1">I have no idea</p>
            </div>
            <div className="flex justify-between mt-2">
                <button onClick={reply} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-1.5 text-sm rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block mb-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                    </svg> Reply

                </button>
                <div className="inline-flex self-end flex justify-center items-center text-sm">
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-1 rounded-l">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block mb-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>200

                    </button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-1 rounded-r">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block mb-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>100

                    </button>
                </div>
            </div>
        </div>
    </>)
}

export default DiscussionAnswer;