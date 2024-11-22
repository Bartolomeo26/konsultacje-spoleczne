function ConsultationAnswer({ reply })
{
    return (<>
        {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 
                                        p-6 max-w-3xl hover:border-gray-300 transition-colors">
                <div className="space-y-4">
                    <div>
                        <p className="text-gray-600">Stefan Stefański</p>
                        <p className="text-xl mt-2 text-gray-900">I have no idea</p>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                        <button
                            onClick={reply}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm 
                               font-medium text-gray-700 bg-gray-100 rounded-lg 
                               hover:bg-gray-200 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block mb-0.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                            </svg>
                            Reply
                        </button>
                        <div className="flex rounded-lg overflow-hidden">
                            <button className="inline-flex items-center gap-1 px-4 py-2 
                                     bg-gray-100 hover:bg-gray-200 text-gray-700 
                                     font-medium text-sm transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block mb-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <span>200</span>
                            </button>
                            <button className="inline-flex items-center gap-1 px-4 py-2 
                                     bg-gray-100 hover:bg-gray-200 text-gray-700 
                                     font-medium text-sm border-l transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block mb-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                </svg>
                                <span>100</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </>
    )
}

export default ConsultationAnswer;