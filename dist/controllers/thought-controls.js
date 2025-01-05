import { Thoughts, Users } from '../models/index.js';
export const getAllThoughts = async (_req, res) => {
    try {
        const dbThoughtData = await Thoughts.find()
            .sort({ createdAt: -1 });
        return res.json(dbThoughtData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
export const getThoughtById = async (req, res) => {
    try {
        const dbThoughtData = await Thoughts.findOne({ _id: req.params.thoughtId });
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'id has no thought' });
        }
        return res.json(dbThoughtData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
export const newThought = async (req, res) => {
    try {
        const dbThoughtData = await Thoughts.create(req.body);
        const dbUserData = await Users.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: dbThoughtData._id } }, { new: true });
        if (!dbUserData) {
            return res.status(404).json({ message: 'thought created but no user with this id' });
        }
        return res.json({ message: 'created new thought' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
export const changeThought = async (req, res) => {
    try {
        const dbThoughtData = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'no thought with this id' });
        }
        return res.json(dbThoughtData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
export const deleteThought = async (req, res) => {
    try {
        const dbThoughtData = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        const dbUserData = Users.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        if (!dbUserData) {
            return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }
        return res.json({ message: 'Thought successfully deleted!' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
/*
 export const newReaction = async(req: Request, res: Response) => {
  try {
    const dbThoughtData = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    return res.json(dbThoughtData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
*/
export const newReaction = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        // Ensure required fields are provided
        if (!req.body.reactionBody || !req.body.username) {
            return res.status(400).json({ message: "Both reactionBody and username are required." });
        }
        const dbThoughtData = await Thoughts.findOneAndUpdate({ _id: thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this ID found!' });
        }
        return res.status(201).json(dbThoughtData);
    }
    catch (err) {
        console.error('Error adding reaction:', err);
        return res.status(500).json({ error: 'An error occurred while adding the reaction.', details: err });
    }
};
export const removeReaction = async (req, res) => {
    try {
        const dbThoughtData = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        return res.json(dbThoughtData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
