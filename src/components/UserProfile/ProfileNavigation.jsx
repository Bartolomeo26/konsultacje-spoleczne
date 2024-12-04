import { Link } from "react-router-dom";



function ProfileNavigation({ handleContentChange, isLoggedIn })
{


    return (
        <>
            <div className="flex w-full lg:w-auto justify-center lg:absolute top-0 left-72">
                <div className="flex text-lg  border-s-4 border-b-4 border-e-4 rounded-b-lg z-10 bg-slate-200" style={{ borderColor: "#155e75" }}>
                    <div className="px-3 py-1">
                        <button onClick={() => handleContentChange('about')}>About</button>
                    </div>
                    <div className="border-s-4 px-3 py-1" style={{ borderColor: "#155e75" }}>
                        <button onClick={() => handleContentChange('communities')}>Communities</button>
                    </div>
                    {isLoggedIn &&
                        <div className="border-s-4 px-3 py-1" style={{ borderColor: "#155e75" }}>
                            <button onClick={() => handleContentChange('settings')}>Settings</button>
                        </div>}
                </div>

            </div >
        </>
    )
}

export default ProfileNavigation;