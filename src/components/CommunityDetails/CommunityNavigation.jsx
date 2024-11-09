import { Link, useParams } from "react-router-dom";


function CommunityNavigation()
{
    const { id } = useParams();
    let link = '/communities/' + id;

    return (
        <>
            <div className="flex">
                <div className="flex text-2xl absolute top-0 left-40 border-s-4 border-b-4 border-e-4 rounded-b-lg z-10 bg-slate-200" style={{ borderColor: "#155e75" }}>
                    <div className="px-3">
                        <Link to={link} preventScrollReset={true}>About</Link>
                    </div>
                    <div className="border-s-4 px-3" style={{ borderColor: "#155e75" }}>
                        <Link to={link + '/consultations'} preventScrollReset={true}>Consultations</Link>
                    </div>
                    <div className="border-s-4 px-3" style={{ borderColor: "#155e75" }}>
                        <Link to={link + '/consultations'} preventScrollReset={true}>New Consultation</Link>
                    </div>
                    <div className="border-s-4 px-3" style={{ borderColor: "#155e75" }}>
                        <Link to={link + '/surveys'} preventScrollReset={true}>Surveys</Link>
                    </div>
                </div>



            </div >
        </>
    )
}

export default CommunityNavigation;