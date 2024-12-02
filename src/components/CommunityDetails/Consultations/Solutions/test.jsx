{isExpanded && (
    <div className="flex flex-col space-y-4 mt-8">
        {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-700">
                No solutions found.
            </div>
        )}
        {!error && solutions?.value?.map((solution) => (
            <div
                key={solution.id}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
                <h2 className="text-xl font-bold text-gray-900 mb-2">{solution.title}</h2>
                <p className="text-gray-600 mb-4">{solution.description}</p>

                {solution.files?.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-3">
                        <h3 className="font-semibold text-gray-800 mb-2">Attached Files:</h3>
                        <ul className="space-y-1">
                            {solution.files.map((file) => (
                                <li 
                                    key={file.id} 
                                    className="hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                                >
                                    <a 
                                        href={`data:image/jpeg;base64,${file.data}`}
                                        download={file.description}
                                        className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="16" 
                                            height="16" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            className="mr-2 text-gray-500"
                                        >
                                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                            <polyline points="14 2 14 8 20 8" />
                                        </svg>
                                        {file.description}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        ))}
    </div>
)}