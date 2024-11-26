function IssueStatusTag({ status })
{
    const statusStyles = [
        'bg-gray-200 text-gray-700', // 0: Gathering Information
        'bg-yellow-200 text-yellow-800', // 1: Voting
        'bg-green-200 text-green-800', // 2: InProgress
        'bg-blue-200 text-blue-800', // 3: FeedbackCollection
        'bg-red-200 text-red-800' // 4: Completed
    ];

    return (

        <span
            className={`absolute bottom-0 left-5 text-center block z-10 px-2 py-2 rounded-lg whitespace-nowrap shadow-lg text-sm font-medium ${statusStyles[status]}`}
        >
            Posted during phase:  <span className="font-bold">{['Gathering Information', 'Voting', 'In Progress', 'Feedback Collection', 'Completed'][status]}</span>
        </span>

    );
};
export default IssueStatusTag;
