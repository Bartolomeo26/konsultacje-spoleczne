import { Link, useParams } from "react-router-dom";


function CommunityNavigation({ permissions, joinRequests })
{
    const { id } = useParams();
    let link = '/communities/' + id;
    const pendingCount = joinRequests?.filter(request => request.status === 0).length;

    return (
        <>
            <div className="flex">
                <div className="flex text-2xl absolute top-0 left-8 lg:left-16 border-s-4 border-b-4 border-e-4 rounded-b-lg z-10 bg-slate-200" style={{ borderColor: "#155e75" }}>
                    <div className="px-3 flex items-center">
                        <Link to={link} preventScrollReset={true}>About</Link>
                    </div>
                    {permissions.isMember || permissions.isAdmin ? <>
                        <div className="border-s-4 px-3 flex items-center" style={{ borderColor: "#155e75" }}>
                            <Link to={link + '/consultations'} preventScrollReset={true}>Consultations</Link>
                        </div>
                        {permissions.isAdmin && <>
                            <div className="border-s-4 px-3 flex items-center" style={{ borderColor: "#155e75" }}>
                                <Link to={link + '/members'} preventScrollReset={true}>Members</Link>
                            </div>
                            <div className="border-s-4 px-3 flex items-center" style={{ borderColor: "#155e75" }}>
                                <Link to={link + '/join-requests'} preventScrollReset={true}>
                                    <span><span className="hidden lg:inline-block">Join</span> Requests</span>
                                    <div className="inline-flex items-center justify-center rounded-full bg-[#155e75] text-white text-xs w-6 h-6 ml-1 mb-1">
                                        <span>{pendingCount}</span>
                                    </div>
                                </Link>
                            </div></>}
                    </> :
                        <>
                            <div className="border-s-4 px-3 text-base flex items-center" style={{ borderColor: "#155e75" }}>
                                <button className="disabled cursor-not-allowed text-gray-600">Consultations</button>
                            </div>

                            <div className="border-s-4 px-3 text-base flex items-center cursor-not-allowed" style={{ borderColor: "#155e75" }}>
                                <button className="disabled cursor-not-allowed text-gray-600">Surveys</button>
                            </div>
                        </>}
                </div>



            </div >
        </>
    )
}

export default CommunityNavigation;