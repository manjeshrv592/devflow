'use server';

import Question from '@/database/question.model';
import { connectToDatabase } from '../mongoose';
import Tag from '@/database/tag.model';
import User from '@/database/user.model';
import { revalidatePath } from 'next/cache';

export const getQuestions = async params => {
  try {
    connectToDatabase();
    const questions = await Question.find({})
      .populate({
        path: 'tags',
        model: Tag,
      })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createQuestion = async params => {
  try {
    // Connect to db
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // Create a question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create a interaction record for the user's ask_question action

    // Increment author's reputation by +5 points for creating a question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
