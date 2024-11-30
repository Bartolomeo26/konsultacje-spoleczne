import { useState } from "react";
import { Link } from "react-router-dom";
import { UserMinus } from "lucide-react";
import MemberRemoveModal from "./MemberRemoveModal";

function MemberCard({ member, handleRemoveMember, isRemoving })
{

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleConfirmRemove = () =>
    {
        handleRemoveMember(member.id);
        closeModal();
    };

    return (
        <>
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
                    <div className="flex flex-col md:flex-row text-sm gap-2 justify-end">
                        <button
                            onClick={openModal}
                            className="p-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 flex justify-center items-center gap-1"
                        >
                            <UserMinus size={18} /> <span>{isRemoving ? "Removing..." : "Kick out"}</span>
                        </button>


                    </div>
                </div>
                <MemberRemoveModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={handleConfirmRemove}
                    memberName={`${member.name} ${member.surname}`}
                />
            </div >

        </>
    );
}

export default MemberCard;