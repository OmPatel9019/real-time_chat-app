import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import FriendRequest from "../models/friendRequest.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async(req,res) =>{
    try{
        const loggedInUserId = req.user._id;
        const currentUser = await User.findById(loggedInUserId).populate("friends", "-password");
        res.status(200).json(currentUser.friends || []);
    }catch(error){
        console.error("Error in getUserForSidebar",error.message);
        res.status(500).json({error:"Internal Server Error"});
    };
};

export const getMessages = async(req,res) =>{
    try{
        const {id: userToChatId} = req.params;
        const myId = req.user._id;

        const currentUser = await User.findById(myId);
        const isFriend = currentUser.friends.some(friendId => friendId.toString() === userToChatId.toString());
        if (!isFriend) {
            return res.status(403).json({message: "Unauthorized - You are not friends with this user"});
        }

        const messages = await Message.find({
            $or:[
                {senderId: myId, recieverId:userToChatId},
                {senderId:userToChatId, recieverId:myId}
            ]
        })
        res.status(200).json(messages)
    }catch(error){
        console.log("Error in Message Controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const sendMessage = async (req,res) =>{
    try{
        const { image, text} = req.body;
        const { id: recieverId} =req.params;
        const senderId =req.user._id;

        const sender = await User.findById(senderId);
        const isFriend = sender.friends.some(friendId => friendId.toString() === recieverId.toString());
        if (!isFriend) {
            return res.status(403).json({message: "Unauthorized - You are not friends with this user"});
        }

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        };

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(recieverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    }catch(error){
        console.log("Error in send Message", error.message);
        res.status(500).json({error:"Internal Server Error"});
}};

export const sendFriendRequest = async (req, res) => {
    try {
        const { email } = req.body;
        const senderId = req.user._id;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const receiver = await User.findOne({ email: email.toLowerCase().trim() });
        if (!receiver) {
            return res.status(404).json({ message: "User not found" });
        }

        if (receiver._id.toString() === senderId.toString()) {
            return res.status(400).json({ message: "You cannot add yourself as a friend" });
        }

        const sender = await User.findById(senderId);
        if (sender.friends.includes(receiver._id)) {
            return res.status(400).json({ message: "User is already in your friends list" });
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                { senderId: senderId, receiverId: receiver._id, status: "pending" },
                { senderId: receiver._id, receiverId: senderId, status: "pending" }
            ]
        });

        if (existingRequest) {
            return res.status(400).json({ message: "Friend request is already pending" });
        }

        const newRequest = new FriendRequest({
            senderId,
            receiverId: receiver._id,
        });

        await newRequest.save();

        res.status(200).json({ message: "Friend request sent successfully!" });
    } catch (error) {
        console.error("Error in sendFriendRequest controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getFriendRequests = async (req, res) => {
    try {
        const myId = req.user._id;
        const requests = await FriendRequest.find({
            receiverId: myId,
            status: "pending"
        }).populate("senderId", "fullName email profilePic");

        res.status(200).json(requests);
    } catch (error) {
        console.error("Error in getFriendRequests controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const myId = req.user._id;

        const request = await FriendRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        if (request.receiverId.toString() !== myId.toString()) {
            return res.status(401).json({ message: "Unauthorized to accept this request" });
        }

        const currentUser = await User.findById(myId);
        const sender = await User.findById(request.senderId);

        if (!currentUser.friends.includes(sender._id)) {
            currentUser.friends.push(sender._id);
            await currentUser.save();
        }

        if (!sender.friends.includes(currentUser._id)) {
            sender.friends.push(currentUser._id);
            await sender.save();
        }

        await FriendRequest.findByIdAndDelete(requestId);

        res.status(200).json({
            _id: sender._id,
            fullName: sender.fullName,
            email: sender.email,
            profilePic: sender.profilePic || "",
        });
    } catch (error) {
        console.error("Error in acceptFriendRequest controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const rejectFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const myId = req.user._id;

        const request = await FriendRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        if (request.receiverId.toString() !== myId.toString() && request.senderId.toString() !== myId.toString()) {
            return res.status(401).json({ message: "Unauthorized to reject this request" });
        }

        await FriendRequest.findByIdAndDelete(requestId);

        res.status(200).json({ message: "Friend request rejected successfully" });
    } catch (error) {
        console.error("Error in rejectFriendRequest controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};