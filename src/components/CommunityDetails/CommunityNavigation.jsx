import { Link, useParams } from "react-router-dom";


function CommunityNavigation({ permissions })
{
    const { id } = useParams();
    let link = '/communities/' + id;

    return (
        <>
            <div className="flex">
                <div className="flex text-2xl absolute top-0 left-40 border-s-4 border-b-4 border-e-4 rounded-b-lg z-10 bg-slate-200" style={{ borderColor: "#155e75" }}>
                    <div className="px-3 flex items-center">
                        <Link to={link} preventScrollReset={true}>About</Link>
                    </div>
                    {permissions.isMember || permissions.isAdmin ? <>
                        <div className="border-s-4 px-3 flex items-center" style={{ borderColor: "#155e75" }}>
                            <Link to={link + '/consultations'} preventScrollReset={true}>Consultations</Link>
                        </div>
                        <div className="border-s-4 px-3 flex items-center" style={{ borderColor: "#155e75" }}>
                            <Link to={link + '/consultations'} preventScrollReset={true}>New Consultation</Link>
                        </div>
                        <div className="border-s-4 px-3 flex items-center" style={{ borderColor: "#155e75" }}>
                            <Link to={link + '/surveys'} preventScrollReset={true}>Surveys</Link>
                        </div>
                    </> :
                        <>
                            <div className="border-s-4 px-3 text-base flex items-center" style={{ borderColor: "#155e75" }}>
                                <button className="disabled cursor-not-allowed text-gray-600">Consultations</button>
                            </div>
                            <div className="border-s-4 px-3 text-base flex items-center cursor-not-allowed" style={{ borderColor: "#155e75" }}>
                                <button className="disabled cursor-not-allowed text-gray-600">New Consultations</button>
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