
import { z } from "zod";
//this is actually link not deck
export const deckSchema = z.object({
  anchor: z.string().min(1),
  title: z.string().min(1),
  deck: z.string().min(1),
  tag: z.string().min(1),
  image: z.string().min(1)
});

/*
Chapter
*/
export const chapterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  image: z.string().min(1),
  decks: z.array(deckSchema)
});

/*
Course
*/
export const courseSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  chapters: z.array(chapterSchema)
});

/*
Root syllabus
*/
export const syllabusSchema = z.object({
  courses: z.array(courseSchema)
});