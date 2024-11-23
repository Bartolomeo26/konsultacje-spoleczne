import { Users } from "lucide-react";
import MemberCard from "./MemberCard";

function MembersList({ members })
{
    return (<div className="flex flex-col w-full">
        <div className="w-4/5 flex flex-col justify-center p-6 mt-10">
            <h1 className='text-2xl mb-3 font-bold flex items-center gap-1'><Users size={26} /><span>Members</span></h1>
            <div className="w-7/12 space-y-3">
                {members.map((member) => <MemberCard key={member.id} member={member} />)}
            </div>
        </div>

    </div>)
}

export default MembersList;