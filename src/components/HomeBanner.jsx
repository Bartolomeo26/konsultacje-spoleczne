import image from '../assets/peopleTalking.png'
function HomeBanner()
{
    return (
        <>
            <div className="flex flex-col md:flex-row justify-center">
                <div className="w-full md:w-2/4 text-center flex justify-center items-end flex-col">
                    <p
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                        style={{
                            width: "100%",
                            maxWidth: "600px"
                        }}
                    >
                        Social Consultations for Communities
                    </p>
                </div>
                <div className="w-full md:w-2/4 flex justify-start">
                    <img
                        src={image}
                        style={{
                            height: "auto",
                            maxHeight: "480px",
                            width: "100%",
                            maxWidth: "600px"
                        }}
                        alt=""
                        className="object-cover"
                    />
                </div>

            </div>
            <hr
                style={{
                    border: "1px solid black",
                    width: "95%"
                }}
                className="w-full"
            />
        </>
    );
}

export default HomeBanner;