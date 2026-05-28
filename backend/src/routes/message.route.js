import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest
} from '../controllers/message.controller.js';

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/requests", protectRoute, getFriendRequests);
router.post("/requests/send", protectRoute, sendFriendRequest);
router.put("/requests/accept/:requestId", protectRoute, acceptFriendRequest);
router.delete("/requests/reject/:requestId", protectRoute, rejectFriendRequest);

router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router; 