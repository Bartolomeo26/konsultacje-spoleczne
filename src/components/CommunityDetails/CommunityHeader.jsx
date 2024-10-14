import city from '../../assets/Bialystok.jpg'
import SubmitButton from '../Forms/Buttons/Button';

function CommunityHeader()
{
    return (
        <>
            <div className="flex w-full border-b-8" style={{ borderColor: "#155e75" }}>
                <div className="w-2/4 flex flex-col items-center justify-center p-8 relative">
                    <div className='absolute top-0 border-b-4 border-s-4 border-e-4 p-4 rounded-b-lg' style={{ borderColor: "#155e75" }}>
                        <h1 className='text-3xl text-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 inline-block mb-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg> Private Community</h1>
                    </div>
                    <h1 className='text-8xl text-center mb-6'>Piaski</h1>
                    <div className='absolute bottom-20'>
                        <SubmitButton text={"Request to join the group!"} />
                    </div>
                </div>
                <div className="w-2/4">
                    <img src={city} alt="" />
                </div>
            </div>
        </>
    )
}

export default CommunityHeader;