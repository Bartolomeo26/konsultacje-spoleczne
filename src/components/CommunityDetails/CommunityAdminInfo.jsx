import { Link } from "react-router-dom";


function CommunityAdminInfo({ administrators })
{


    return (
        <div className="absolute top-0 z-10 right-96  bg-slate-200">
            <div className="relative flex flex-col justify-center px-4 py-3 text-center border-s-4 border-b-4 border-e-4 rounded-b-lg" style={{ borderColor: "#155e75" }}>
                <div className="border-b-4" style={{ borderColor: "#155e75" }}>
                    <h1 className='text-2xl mb-3 font-bold mt-1'><span> Administrators</span>
                    </h1>
                </div>
                <Link to={`/users/${administrators[0].id}`}>
                    <div className="flex flex-col items-center mb-1 py-1 border-b-4" style={{ borderColor: "#155e75" }}>
                        <h1 className="font-semibold">{administrators[0].name} {administrators[0].surname}</h1>
                        <p>{administrators[0].email}</p>
                    </div>
                </Link>
                <Link to={`/users/${administrators[0].id}`}>
                    <div className="flex flex-col items-center ">
                        <h1 className="font-semibold">{administrators[0].name} {administrators[0].surname}</h1>
                        <p>{administrators[0].email}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default CommunityAdminInfo;