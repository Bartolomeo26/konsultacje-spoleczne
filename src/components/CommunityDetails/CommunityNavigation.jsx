import { Link, useParams } from "react-router-dom";


function CommunityNavigation()
{
    const { id } = useParams();
    let link = '/communities/' + id;

    return (
        <>
            <div className="flex">
                <div className="flex text-2xl absolute top-0 border-s-4 border-b-4 border-e-4 rounded-b-lg z-10 bg-slate-200" style={{ borderColor: "#155e75" }}>
                    <div className="px-3">
                        <Link to={link} preventScrollReset={true}>About</Link>
                    </div>
                    <div className="border-s-4 px-3" style={{ borderColor: "#155e75" }}>
                        <Link to={link + '/discussions'} preventScrollReset={true}>Discussions</Link>
                    </div>
                    <div className="border-s-4 px-3" style={{ borderColor: "#155e75" }}>
                        <Link to={link + '/discussions/new'} preventScrollReset={true}>New Discussion</Link>
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