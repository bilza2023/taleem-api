import { z } from "zod";

export const linkSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1)
});

export const discussionItemSchema = z.object({
  questionText: z.string().min(1),
  answerText: z.string().optional(),
  links: z.array(linkSchema).optional()
});

export const discussionSchema = z.object({
  discussion: z.array(discussionItemSchema)
});