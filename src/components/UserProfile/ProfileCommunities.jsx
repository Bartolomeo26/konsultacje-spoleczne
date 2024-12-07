import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCommunitiesList } from "../../util/fetch";
import CommunityCard from "../CommunityCard";
import LoadingIndicator from "../LoadingIndicator";

function ProfileCommunities({ user, isLoggedIn })
{
    const [filter, setFilter] = useState({ admin: true, member: true });

    const { isPending, error, data: communities } = useQuery({
        queryKey: ["communities", "profileCommunities"],
        queryFn: () => getCommunitiesList('%2C%20administrators'),
        retry: 0,
    });

    const handleFilterChange = (role) =>
    {
        setFilter((prev) => ({ ...prev, [role]: !prev[role] }));
    };

    const filteredCommunities = communities?.value.filter((community) =>
    {
        const isAdmin = community.administrators?.some((admin) => admin.id === user.id);
        const isMember = community.members?.some((member) => member.id === user.id);


        return (filter.admin && isAdmin) || (filter.member && isMember);
    });

    return (
        <div className="flex flex-col w-full ">
            <div className="w-full flex flex-col justify-center items-center lg:items-stretch  lg:p-2 py-4">
                <h1 className="text-2xl mb-3 font-bold capitalize">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 inline-block mb-1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                        />
                    </svg>{" "}
                    {isLoggedIn ? 'Your Communities' : `${user?.name}'s Communities`}
                </h1>
                {isPending ? <LoadingIndicator /> : <>
                    {/* Sekcja checkboxów */}
                    <div className="flex space-x-4 mb-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={filter.admin}
                                onChange={() => handleFilterChange("admin")}
                            />
                            <span>Admin</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={filter.member}
                                onChange={() => handleFilterChange("member")}
                            />
                            <span>Member</span>
                        </label>
                    </div>

                    <div className="grid grid-cols-2 place-items-center sm-grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-3 ">
                        {filteredCommunities?.length > 0 ? (
                            filteredCommunities.map((community) =>
                            {
                                const isAdmin = community.administrators.some(
                                    (admin) => admin.id === user.id
                                );
                                const isMember = community.members.some(
                                    (member) => member.id === user.id
                                );

                                return (
                                    <CommunityCard
                                        key={community.id}
                                        community={community}
                                        permission={isAdmin ? "Admin" : isMember ? "Member" : null}
                                    />
                                );
                            })
                        ) : (
                            <p>No communities found.</p>
                        )}
                    </div>
                </>}
            </div>
        </div>
    );
}

export default ProfileCommunities;
