import { Router } from 'express';
import {
getAllThoughts,
getThoughtById,
changeThought,
newThought,
deleteThought,
newReaction,
removeReaction
} from '../../controllers/thought-controls.js';

const router = Router();
router.route('/').get(getAllThoughts).post(newThought);
router.route('/:thoughts').get(getThoughtById).put(changeThought).delete(deleteThought);
router.route('/thoughts/reactions').post(newReaction);
router.route('/:thoughts/reactions/:reactionId').delete(removeReaction);

export { router as thoughtsRoutes };