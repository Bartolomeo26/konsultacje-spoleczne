import { Link } from "react-router-dom";

function AboutProject()
{
    return (
        <>
            <div className="w-3/4 flex flex-col justify-center items-center mt-5 mb-5">
                <h1 className="text-4xl mb-5">About Project</h1>
                <p className=" text-2xl text-center">
                    This platform is here to help make your voice heard in important community decisions.
                    It’s a space where you can share your opinions, give feedback, and participate in public consultations on various topics.
                    Whether it’s about local development, new policies, or community projects, your input matters.
                    The platform is easy to use, allowing you to join discussions, answer surveys, and stay updated on the decisions that affect you.
                    Together, we can shape the future of our community!
                </p>
                <p className="mt-2 text-2xl font-bold text-center">
                    For more information, check our <Link to="/faq" className="text-2xl">FAQ!</Link>
                </p>
            </div>
            <hr style={{ border: "1px solid black", width: "95%" }} />
        </>
    )

}

export default AboutProject;