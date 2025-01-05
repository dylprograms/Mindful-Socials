import { Request, Response } from 'express';
import { Users, Thoughts } from '../models/index.js';

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

 export const makeNewUser = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.email) {
    return res.status(400).json({ message: "Username and email are required" });
  }
  try {
    const dbUserData = await Users.create(req.body);
    return res.json(dbUserData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error", details: err });
  }
}
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
 export const deleteUser = async(req: Request, res: Response) =>{
   try {
     const dbUserData = await Users.findOneAndDelete({ _id: req.params.userId })

     if (!dbUserData) {
       return res.status(404).json({ message: 'id has no user' });
     }
     await Thoughts.deleteMany({ _id: { $in: dbUserData.thoughts } });
     return res.json({ message: 'thoughts and user deleted' });
   } catch (err) {
     console.log(err);
     return res.status(500).json(err);
   }
 }
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
