import { z } from 'zod';

// Example schemas - add your shared Zod schemas here
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  members: z.array(userSchema),
});

export type User = z.infer<typeof userSchema>;
export type Team = z.infer<typeof teamSchema>;


