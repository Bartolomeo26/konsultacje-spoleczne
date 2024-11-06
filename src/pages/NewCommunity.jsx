import CommunityForm from "../components/Forms/CommunityForm";


function NewCommunity()
{

    return (<div className="flex flex-col w-full items-center mt-10">
        <h1 className="text-4xl">Create a new Community!</h1>
        <CommunityForm>


            <button type="submit" className="">
                Create Community
            </button>


        </CommunityForm >
    </div>)

}

export default NewCommunity;