function ConsultationInput({ handleInput, value, inputRef })
{
    return (<>
        <div className="space-y-2 w-full md:w-1/2 mt-3">
            <label className="text-sm font-medium text-gray-700">
                Contribute to the discussion!
            </label>
            <textarea
                ref={inputRef}
                rows={4}
                value={value}
                onChange={handleInput}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 
                     placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 
                     focus:ring-cyan-500 focus:ring-opacity-20"
                placeholder="Write your thoughts here..."
            />
        </div>
    </>)
}

export default ConsultationInput;