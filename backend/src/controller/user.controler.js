import { User } from "../model/User.js";

import { FriendRequest } from "../model/FriendRequest.js";

export const getRecommendedFriend = async (req, res) => {
  const userId = req.userId;
  const user = req.user;
  try {
    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: userId } },
        { _id: { $nin: user.friends } },
        { isOnboardered: true },
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("error in recoomended user controller", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export const getMyFriend = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId)
      .select("friends")
      .populate(
        "friends",
        "fullName nativeLanguage learningLanguage profilePic"
      );
    // console.log("user in getmyfriends controller")
    res.status(200).json(user.friends);
    // console.log(user.friends)
  } catch (error) {
    console.log("error in get friends user controller", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export const sendFriendRequest = async (req, res) => {
  const userid = req.userId;
  const { id: recipientid } = req.params;
  // console.log("recipient id", recipientid);
  try {
    if (userid === recipientid) {
      return res.status(400).json({
        success: false,
        message: "you can't send request to yourself",
      });
    }
    const recipient = await User.findById(recipientid);
    // console.log("recipient",recipient)

    if (!recipient) {
      return res
        .status(400)
        .json({ success: false, message: "Recipient not correct" });
    }

    if (recipient.friends.includes(userid)) {
      return res
        .status(400)
        .json({ success: false, message: "you both are friends already " });
    }

    const friendRequestAlreadyExist = await FriendRequest.find({
      $or: [
        { sender: userid, recipient: recipientid },
        { recipient: userid, sender: recipientid },
      ],
    });
    // console.log("already exist",friendRequestAlreadyExist)
    if (friendRequestAlreadyExist.length > 0) {
      return res.status(400).json({
        success: false,
        message: "a friend request already exists between you and this user",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: userid,
      recipient: recipientid,
    });
    // console.log("friendRequest cretaed", friendRequest);
    res.status(201).json(friendRequest);
  } catch (error) {
    console.log("error in send friend request user controller", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export const acceptFriendRequest = async (req, res) => {
  const { id: requestId } = req.params;
  try {
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(401).json({
        success: false,
        message: "request not found,invalid request id",
      });
    }
    console.log("frnd req",friendRequest)
    if (friendRequest.recipient.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "you're not authurized to accept the request",
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    //save recipient id into sender frineds array
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    //save send id into recipient frineds array
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res
      .status(200)
      .json({ success: true, message: "Friend Request accepted" });
  } catch (error) {
    console.log("error in accepting friend request user controller", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export const getFriedRequests = async (req, res) => {
  const myId = req.userId;
  try {
    const incomingRequests = await FriendRequest.find({
      recipient: myId,
      status: "pending",
    }).populate(
      "sender",
      "fullName nativeLanguage learningLanguage profilePic"
    );

    

    if (!incomingRequests) {
      return res.status(400).json({
        success: false,
        message: " no incoming friends request not found",
      });
    }

    const acceptedRequests = await FriendRequest.find({
      sender: myId,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    if (!acceptedRequests) {
      return res.status(400).json({
        success: false,
        message: " nobody accept your friend request  ",
      });
    }
    res.status(200).json({incomingRequests, acceptedRequests});
  } catch (error) {
    console.log("error in  get friends request user controller", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

export const outgoingRequest = async (req, res) => {
  try {
    const userId = req.userId;
    const outgoingrequest = await FriendRequest.find({
      sender: userId,
      status: "pending",
    }).populate(
      "recipient",
      "fullName,nativeLanguage,LearningLangugae,profilePic"
    );
    // console.log("outgoing request", outgoingrequest);
    if (!outgoingrequest) {
      return res.status(400).json({
        success: false,
        message: " no outgoing  friend request  found",
      });
    }
    res.status(200).json(outgoingrequest);
  } catch (error) {
    console.log("error in outgoing friends request user controller", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};
