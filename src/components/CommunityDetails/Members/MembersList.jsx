import { Users } from "lucide-react";
import MemberCard from "./MemberCard";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { removeMember } from "../../../util/fetch";
import { useParams } from "react-router-dom";

function MembersList({ members })
{
    const [currentMembers, setCurrentMembers] = useState(members);
    const { id: communityId } = useParams();
    const mutation = useMutation({
        mutationFn: (userId) => removeMember(communityId, members.findIndex(member => member.id === userId)),
        onSuccess: (data) =>
        {
            // On success, update the local state
            setCurrentMembers((prevMembers) => prevMembers.filter((member) => member.id !== data.id));
            console.log(`Member with ID ${data.id} removed successfully.`);
        },
        onError: (error) =>
        {
            console.error("Failed to remove member:", error);
        },
    });

    function handleRemoveMember(userId)
    {
        // Trigger mutation on member removal
        mutation.mutate(userId);
    }
    return (<div className="flex flex-col w-full">
        <div className="lg:w-4/5 flex flex-col justify-center p-6 mt-10">
            <h1 className='text-2xl mb-3 font-bold flex items-center gap-1'><Users size={26} /><span>Members</span></h1>
            <div className="lg:w-7/12 space-y-3">
                {members.map((member) => <MemberCard key={member.id} member={member} handleRemoveMember={handleRemoveMember} isRemoving={mutation.isLoading} />)}
            </div>
        </div>

    </div>)
}

export default MembersList;