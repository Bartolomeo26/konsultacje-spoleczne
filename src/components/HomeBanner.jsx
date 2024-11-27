import image from '../assets/peopleTalking.png'
function HomeBanner()
{
    return (
        <>
            <div className="flex flex-col md:flex-row justify-center w-full">
                <div className="w-full md:w-2/4 text-center flex justify-center lg:justify-end items-center px-3 lg:p-0">
                    <p
                        className="text-5xl md:text-6xl lg:text-7xl"
                        style={{
                            width: "100%",
                            maxWidth: "600px"
                        }}
                    >
                        Social Consultations for Communities
                    </p>
                </div>
                <div className="w-full md:w-2/4 flex justify-center lg:justify-start mt-4 lg:mt-0">
                    <img
                        src={image}
                        style={{

                            height: "480px",
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