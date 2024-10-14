
function CommunityMain()
{
    return (
        <>
            <div className="flex flex-col w-full px-28 mb-10">
                <div className="flex">
                    <div className="w-4/5 flex flex-col justify-center p-6">
                        <h1 className='text-2xl mb-3 font-bold'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block mb-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                        </svg>What do we do</h1>
                        <p className='text-xl w-3/4'>Piaski is a lively district in Bialystok, located near the heart of the city. It offers a mix of residential areas and green spaces, making it a popular choice for families and young professionals. With easy access to local amenities and public transport, Piaski is both convenient and well-connected. Join our community if you are living here!</p>
                    </div>
                    <div className="w-1/5 flex flex-col justify-center ms-auto px-6 py-3 text-center border-s-4 border-b-4 border-e-4 rounded-b-lg" style={{ borderColor: "#155e75" }}>
                        <h1 className='text-2xl mb-3 font-bold mt-1'> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block mb-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg><span> Basic Info</span>
                        </h1>
                        <p className="text-lg border-b-4 py-1" style={{ borderColor: "#155e75" }}>Location: Białystok</p>
                        <p className="text-lg border-b-4 py-1" style={{ borderColor: "#155e75" }}>Date: 14.10.2024</p>
                        <p className="text-lg border-b-4 py-1" style={{ borderColor: "#155e75" }}>Members: 213</p>
                        <p className="text-lg py-1" style={{ borderColor: "#155e75" }}>Email: piaski@gmail.com</p>
                    </div>
                </div>
                <div className="w-4/5 flex flex-col justify-center p-6">
                    <h1 className='text-2xl mb-3 font-bold'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 inline-block mb-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                    </svg>
                        Docs</h1>
                    <p className='text-xl w-3/4'>Piaski is a lively district in Bialystok, located near the heart of the city. It offers a mix of residential areas and green spaces, making it a popular choice for families and young professionals. With easy access to local amenities and public transport, Piaski is both convenient and well-connected. Join our community if you are living here!</p>
                </div>
            </div>
        </>
    )
}

export default CommunityMain;