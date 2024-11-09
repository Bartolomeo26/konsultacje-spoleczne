import { Link } from "react-router-dom";


function ProfileNavigation({ handleContentChange })
{


    return (
        <>
            <div className="flex absolute top-0 left-72">
                <div className="flex text-lg  border-s-4 border-b-4 border-e-4 rounded-b-lg z-10 bg-slate-200" style={{ borderColor: "#155e75" }}>
                    <div className="px-3">
                        <button onClick={() => handleContentChange('about')}>About</button>
                    </div>
                    <div className="border-s-4 px-3" style={{ borderColor: "#155e75" }}>
                        <button onClick={() => handleContentChange('communities')}>Communities</button>
                    </div>
                    <div className="border-s-4 px-3" style={{ borderColor: "#155e75" }}>
                        <button onClick={() => handleContentChange('consultations')}>Consultations</button>
                    </div>
                    <div className="border-s-4 px-3" style={{ borderColor: "#155e75" }}>
                        <button onClick={() => handleContentChange('settings')}>Settings</button>
                    </div>
                </div>



            </div >
        </>
    )
}

export default ProfileNavigation;