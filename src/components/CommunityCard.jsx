import { Link } from "react-router-dom";

function CommunityCard({ city })
{
    return (
        <>
            <div className="max-w-[14rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to="/communities/1">
                    <img className="rounded-t-lg h-32 w-full object-cover" src={city.image} alt="" />
                </Link>
                <div className="p-2">
                    <Link to="/communities/1">
                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{city.name}</h5>
                    </Link>
                    <p className="mb-2 text-xs font-normal text-gray-700 dark:text-gray-400">
                        {city.description}                    </p>
                    <Link
                        to="/communities/1"
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Join in
                        <svg
                            className="rtl:rotate-180 w-3 h-3 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>
            </div>


        </>
    )
}

export default CommunityCard;