import { z } from "zod";

export const reviewSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  score: z.coerce
    .number()
    .int()
    .min(1, "Score is required")
    .max(10, "Score must be between 1 and 10"),
  comment: z
    .string()
    .trim()
    .min(10, "The review must be at least 10 characters long")
    .max(300, "The review must be at most 300 characters long"),
});

export function validateReview(data) {
  const results = reviewSchema.safeParse(data);

  if (results.success) {
    return { ok: true, data: results.data, errors: {} };
  }

  const errors = {};
  for (const issue of results.error.issues) {
    const field = issue.path[0];
    if (!errors[field]) errors[field] = issue.message;
  }

  return { ok: false, data: null, errors };
}
