import { Router } from 'express';
import { getAllUsers, getUserById, makeNewUser, deleteUser, updateCurrentUser, addFriend, removeFriend } from '../../controllers/user-controllers.js';
const router = Router();
router.route('/').get(getAllUsers).post(makeNewUser);
router.route('/:userId').get(getUserById).put(updateCurrentUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
export { router as usersRoutes };
