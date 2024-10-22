function DiscussionInput({ handleInput, value })
{
    return (<>
        <div className="mt-3 w-3/5">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Contribute to the discussion!</label>
            <textarea id="message" rows="4" onChange={handleInput} className="block p-2.5 w-full text-sm text-gray-900
             bg-gray-50 rounded-lg border  border-slate-400 focus:ring-blue-500 focus:border-blue-500" value={value} placeholder="Write your thoughts here..." />
        </div>
    </>)
}

export default DiscussionInput;