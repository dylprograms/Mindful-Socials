import { Request, Response } from 'express';
import { Users, Thoughts } from '../models/index.js';

 // get all users
 export const getAllUsers = async(_req: Request, res: Response) => {
   try {
     const dbUserData = await Users.find()
       .select('-__v')

     return res.json(dbUserData);
   } catch (err) {
     console.log(err);
     return res.status(500).json(err);
   }
 }
 // get single user by id
 export const getUserById = async(req: Request, res: Response) => {
   try {
     const dbUserData = await Users.findOne({ _id: req.params.userId })
       .select('-__v')
       .populate('friends')
       .populate('thoughts');

     if (!dbUserData) {
       return res.status(404).json({ message: 'id has no user' });
     }

     return res.json(dbUserData);
   } catch (err) {
     console.log(err);
     return res.status(500).json(err);
   }
 }
 // create a new user
 export const makeNewUser = async(req: Request, res: Response) => {
   try {
     const dbUserData = await Users.create(req.body);
     return res.json(dbUserData);
   } catch (err) {
     console.log(err);
     return res.status(500).json(err);
   }
 }
 // update a user
 export const  updateCurrentUser = async(req: Request, res: Response) => {
   try {
     const dbUserData = await Users.findOneAndUpdate(
       { _id: req.params.userId },
       {
         $set: req.body,
       },
       {
         runValidators: true,
         new: true,
       }
     );

     if (!dbUserData) {
       return res.status(404).json({ message: 'id has no user' });
     }

     return res.json(dbUserData);
   } catch (err) {
     console.log(err);
     return res.status(500).json(err);
   }
 }
 // delete user (BONUS: and delete associated thoughts)
 export const deleteUser = async(req: Request, res: Response) =>{
   try {
     const dbUserData = await Users.findOneAndDelete({ _id: req.params.userId })

     if (!dbUserData) {
       return res.status(404).json({ message: 'id has no user' });
     }

     // BONUS: get ids of user's `thoughts` and delete them all
     await Thoughts.deleteMany({ _id: { $in: dbUserData.thoughts } });
     return res.json({ message: 'thoughts and user deleted' });
   } catch (err) {
     console.log(err);
     return res.status(500).json(err);
   }
 }

 // add friend to friend list
 export const addFriend = async(req: Request, res: Response) =>{
   try {
     const dbUserData = await Users.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });

     if (!dbUserData) {
       return res.status(404).json({ message: 'id has no user' });
     }

     return res.json(dbUserData);
   } catch (err) {
     console.log(err);
     return res.status(500).json(err);
   }
 }
 // remove friend from friend list
 export const removeFriend = async(req: Request, res: Response) => {
   try {
     const dbUserData = await Users.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });

     if (!dbUserData) {
       return res.status(404).json({ message: 'id has no user' });
     }
     return res.json(dbUserData);
   } catch (err) {
     console.log(err);
     return res.status(500).json(err);
   }
 };
