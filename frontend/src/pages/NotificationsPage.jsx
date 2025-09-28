import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { acceptFriendRequest, getFriendRequest } from "../lib/api";
import {
  BellIcon,
  ClockIcon,
  MessageSquareIcon,
  UserCheckIcon,
} from "lucide-react";
import { getLanguageFlag } from "../components/FriendCard";
import NoNotiificationFound from "../components/NoNotiificationFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();
  const { data: friendRequest, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequest,
  });

  const { mutate: acceptFriendRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
  const incomingReqs = friendRequest?.incomingRequests;
  const acceptedReqs = friendRequest?.acceptedRequests;

  return (
    <div className="p-4 sm:p-6 lg:p-8 ">
      <div className="container mx-auto max-w-4xl space-y-8 ">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <>
            {incomingReqs?.length > 0 && (
              <section className="space-y-2">
                <h2 className="text-xl  font-semibold flex items-center gap-2">
                  <UserCheckIcon className="text-primary size-5" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">
                    {incomingReqs.length}
                  </span>
                </h2>
                <div className="space-y-3">
                  {incomingReqs.map((req) => (
                    <div
                      className="card bg-base-200 hover:shadow-md transition-shadow"
                      key={req._id}
                    >
                      <div className="card-body  p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="size-14 avatar rounded-full bg-base-300">
                                <img
                                  src={req.sender.profilePic}
                                  alt={req.sender.fullName}
                                />
                              </div>
                              <h3 className="font-semibold ">
                                {req.sender.fullName}
                              </h3>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              <span className="badge badge-primary badge-sm">
                                {getLanguageFlag(req.sender.nativeLanguage)}
                                Native: {req.sender.nativeLanguage}
                              </span>
                              <span className="badge badge-secondary badge-sm">
                                {getLanguageFlag(req.sender.learningLanguage)}
                                Learning: {req.sender.learningLanguage}
                              </span>
                            </div>
                          </div>

                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => acceptFriendRequestMutation(req._id)}
                            disabled={isPending}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {/* Accepted Request */}

            {acceptedReqs?.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl  font-semibold flex items-center gap-2">
                  <BellIcon className="text-primary size-5" />
                  New Connections
                  <span className="badge badge-primary ml-2">
                    {acceptedReqs.length}
                  </span>
                </h2>
                <div>
                  {acceptedReqs.map((req) => (
                    <div className="card bg-base-200 shadow-sm">
                      <div className="card-body p-4">
                        <div className="flex flex-start gap-3">
                          <div className="size-10 avatar rounded-full bg-base-300 border border-secondary-content">
                            <img
                              src={req.recipient.profilePic}
                              alt={req.recipient.fullName}
                            />
                          </div>
                          <div className="flex-1 ">
                            <h3 className="font-semibold ">
                              {req.recipient.fullName}
                            </h3>
                            <p className="text-sm my-1">
                              {" "}
                              {req.recipient.fullName} Accept your request
                            </p>
                            <p className="text-sm flex  items-center  opacity-70">
                              <ClockIcon className="size-4 mr-2" />
                              Recently
                            </p>
                          </div>
                          <div className="badge badge-success">
                            <MessageSquareIcon className="size-4 mr-2" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {incomingReqs?.length === 0 && acceptedReqs?.length === 0 && (
              <NoNotiificationFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
