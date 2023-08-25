import { z } from "zod";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type Dog = z.infer<typeof dogSchema>;

export type Ttab =
  | "all-dogs"
  | "favorite-dogs"
  | "unfavorite-dogs"
  | "create-dog";
