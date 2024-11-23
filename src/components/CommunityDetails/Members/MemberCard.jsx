import { Link } from "react-router-dom";
import { UserCheck, UserMinus } from "lucide-react";

function MemberCard({ member, handleRemoveMember, isRemoving })
{
    return (
        <div className="p-4 bg-white shadow-md rounded-md flex items-center justify-between">
            <div>
                <Link to={`/users/${member.id}`}>
                    <h2 className="text-lg font-semibold">{`${member.name} ${member.surname}`}</h2></Link>
                <p className="text-sm text-gray-600">{member.email}</p>
                <p className="text-sm text-gray-600">
                    Birth Date: {new Date(member.birthDate).toLocaleDateString()}
                </p>
            </div>
            <div className="w-1/2 self-end">
                <div className="flex text-sm gap-2 justify-end">
                    <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 flex items-center gap-1"
                    >
                        <UserMinus size={18} /> <span>{isRemoving ? "Removing..." : "Kick out"}</span>
                    </button>
                    <button

                        className="p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 flex items-center gap-1"
                    >
                        <UserCheck size={18} /> <span>  Grant Admin</span>
                    </button>

                </div>
            </div>

        </div >
    );
}

export default MemberCard;