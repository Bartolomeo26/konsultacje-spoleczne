import { Users, X } from 'lucide-react';
import defaultProfile from '../../../../assets/defaultProfile.jpg'
import { Link } from 'react-router-dom';
const UpvotesModal = ({ upvotes, onClose }) =>
{
    return (
        <div onClick={(e) =>
        {

            if (e.target === e.currentTarget)
            {
                onClose();
            }
        }} className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg w-96 max-h-96 overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5" /> Upvotes ({upvotes.length})
                    </h2>
                    <button
                        onClick={onClose}
                        className="hover:bg-gray-100 rounded-full p-1"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="divide-y">
                    {upvotes.map((user) => (
                        <Link key={user.id} to={`/users/${user.id}`}>
                            <div

                                className="flex items-center gap-3 p-4 hover:bg-gray-50"
                            >
                                {user.avatar ? (
                                    <img
                                        src={`data:image/jpeg;base64,${user.avatar.data}`}
                                        alt={`${user.name} ${user.surname}'s avatar`}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={defaultProfile}
                                        alt={`${user.name} ${user.surname}'s avatar`}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                )}
                                <div>
                                    <p className="font-medium">{user.name} {user.surname}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpvotesModal;