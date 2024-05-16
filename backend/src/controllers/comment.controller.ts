// Express
import { Request, Response } from "express";
// Models
import { Comment } from "../models";

export const getActivityComments = async (req: Request, res: Response) => {
  const { activityId } = req.query;
  try {
    const comments = await Comment.find({ activity: activityId })
      .populate("author", "name")
      .populate({
        path: "replies",
        populate: { path: "author", select: "name" },
      })
      .exec();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: ["Error al obtener los comentarios"] });
  }
};

export const addActivityComment = async (req: Request, res: Response) => {
  const { content } = req.body;
  const { userId, activityId } = req.query;
  try {
    const newComment = await new Comment({
      content,
      author: userId,
      activity: activityId,
      replies: [],
    }).save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: ["Error al añadir el comentario"] });
  }
};

export const deleteActivityComment = async (req: Request, res: Response) => {
  const { commentId } = req.body;
  try {
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: ["Comentario eliminado correctamente"] });
  } catch (error) {
    res.status(500).json({ message: ["Error al eliminar el comentario"] });
  }
};

export const addReplyComment = async (req: Request, res: Response) => {
  const { content } = req.body;
  const { userId, commentId } = req.query;

  try {
    // Crear la nueva respuesta
    const newReply = await new Comment({
      content,
      author: userId,
      activity: null, // Especificar que es una respuesta
      replies: [],
    }).save();

    // Añadir la respuesta al comentario original
    await Comment.findByIdAndUpdate(commentId, {
      $push: { replies: newReply._id },
    });

    // Devolver la respuesta creada
    const populatedReply = await Comment.findById(newReply._id).populate(
      "author"
    );

    res.status(201).json(populatedReply);
  } catch (error) {
    res.status(500).json({ message: [error] });
  }
};