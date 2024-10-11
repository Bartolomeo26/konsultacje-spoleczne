import image from '../assets/peopleTalking.png'
function HomeBanner()
{
    return (
        <>
            <div className="flex justify-center">
                <div className="w-2/4 text-center flex justify-center items-end flex-col">
                    <p className="text-7xl" style={{ width: "600px" }}>Social Consultations for Communities</p>
                </div>
                <div className="w-2/4 flex justify-start">
                    <img src={image} style={{ height: "480px", width: "600px" }} alt="" />
                </div>
            </div>
            <hr style={{ border: "1px solid black", width: "95%" }} />
        </>
    );
}

export default HomeBanner;