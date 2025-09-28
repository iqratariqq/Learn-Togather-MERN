import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  getMyFriends,
  getReccomendedUsers,
  outgoingFriendRequest,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router-dom";
import {
  CheckCircleIcon,

  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NOFriendCard from "../components/NOFriendCard";
import { captalize } from "../lib/utilis";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingFriendRequestids, setOutgoiongFriendRequestids] = useState(
    new Set()
  );

  const { data: friends, isLoading: friendsLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getMyFriends,
  });
  const { data: reccomendedFriends, isLoading: reccomendedFriendsLoading } =
    useQuery({
      queryKey: ["reccomendedFriends"],
      queryFn: getReccomendedUsers,
    });

  const { data: outGoingFriendsReq, isLoading: outgoingRequestsLoading } =
    useQuery({
      queryKey: ["outGoingRequests"],
      queryFn: outgoingFriendRequest,
    });

  const { mutate: sendFriendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outGoingRequests"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();

    if (outGoingFriendsReq && outGoingFriendsReq.length > 0) {
      outGoingFriendsReq.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });

      setOutgoiongFriendRequestids(outgoingIds);
    }
  }, [outGoingFriendsReq]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10 ">
        <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to={"/notifications"}>
            <button className="btn btn-outline btn-sm">
              <UsersIcon className=" size-4 mr-4" />
              Friend Requests
            </button>
          </Link>
        </div>
        {friendsLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
    

            <NOFriendCard />
       
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   ">
            {friends?.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
        <section>
          <div className=" mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Meet New Friends
              </h2>
              <p className="opacity-70">Discover your Language partner</p>
            </div>
            {reccomendedFriendsLoading ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : reccomendedFriends.length === 0 ? (
              <div className="card bg-base-200 p-6 text-center ">
                <h3 className="font-semibold text-lg mb-2 text-">
                  No Users yet
                </h3>
                <p className="text-base-conttent opacity-70">
                  Check later for Meet new Partners
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
                {reccomendedFriends?.map((recommendedFriend) => {
                  const hasSentRequest = outgoingFriendRequestids.has(
                    recommendedFriend._id
                  );

                  return (
                    <div
                      key={recommendedFriend._id}
                      className="card bg-base-200 hover:shadow-lg transition-shadow duration-200"
                    >
                      <div className="card-body p-4 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="avatar size-16 rounded-full">
                            <img src={recommendedFriend.profilePic} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {captalize(recommendedFriend.fullName)}
                            </h3>
                            {recommendedFriend.location && (
                              <div className="flex items-center text-sm ">
                                <MapPinIcon className="size-4 opacity-60 mr-1" />
                                {captalize(recommendedFriend.location)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="badge badge-secondary">
                            {getLanguageFlag(recommendedFriend.nativeLanguage)}
                            Native:{" "}
                            {captalize(recommendedFriend.nativeLanguage)}
                          </span>
                          <span className="badge badge-outline">
                            {getLanguageFlag(
                              recommendedFriend.learningLanguage
                            )}
                            Learning:{" "}
                            {captalize(recommendedFriend.learningLanguage)}
                          </span>
                        </div>
                        {recommendedFriend.bio && (
                          <p className="text-sm opacity-80 ">
                            {recommendedFriend.bio}
                          </p>
                        )}
                        <button
                          className={`btn w-full mt-2 ${
                            hasSentRequest ? "btn-disabled" : "btn-primary"
                          }`}
                          onClick={() =>
                            sendFriendRequestMutation(recommendedFriend._id)
                          }
                          disabled={hasSentRequest || isPending}
                        >
                          {hasSentRequest ? (
                            <>
                              <CheckCircleIcon className="size-4 mr-2" />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <UserPlusIcon className="size-4 mr-2" />
                              Send Friend Request
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;


