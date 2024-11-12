import city from '../../assets/Bialystok.jpg'

function CommunityHeader({ community, permissions })
{
    return (
        <>
            <div className='flex flex-col'>
                <div className="flex w-full border-b-8 " style={{ borderColor: "#155e75", height: "430px" }}>
                    <div className="w-2/4 flex flex-col items-center justify-center p-6 relative">
                        <div className='absolute top-0 border-b-4 border-s-4 border-e-4 p-4 rounded-b-lg bg-slate-200' style={{ borderColor: "#155e75" }}>
                            <h1 className='text-xl text-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 inline-block mb-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg> {community.isPublic ? "Public Community" : "Private Community"}</h1>
                        </div>
                        <h1 className='text-8xl text-center mb-6'>{community.name}</h1>
                        {(!permissions.isAdmin && !permissions.isMember) &&
                            <div className='absolute bottom-20'>
                                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 inline-block">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                                </svg> Request to join the group</button>
                            </div>}
                    </div>
                    <div className="w-2/4">
                        <img src={`data:image/jpeg;base64,${community.background.data}`} alt="" className='object-fill w-full h-full' />
                    </div>
                </div>

            </div>
        </>
    )
}

export default CommunityHeader;