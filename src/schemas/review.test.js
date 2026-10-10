import { describe, it, expect } from "vitest";
import { validateReview } from "./review";

const success = {
  name: "Ana",
  score: "9",
  comment: "A wonderful movie",
};

describe("validateReview", () => {
  it("Accept valid data and convert score to a number", () => {
    const review = validateReview(success);
    expect(review.ok).toBe(true);
    expect(review.data.score).toBe(9);
  });

  it("Reject empty name", () => {
    const review = validateReview({ ...success, name: "" });
    expect(review.ok).toBe(false);
    expect(review.errors.name).toMatch("Name is required");
  });

  it("Reject out score ranges", () => {
    expect(
      validateReview({ ...success, score: "0" }).errors.score,
    ).toBeDefined();
    expect(
      validateReview({ ...success, score: "11" }).errors.score,
    ).toBeDefined();
  });

  it("reject short comment", () => {
    const review = validateReview({ ...success, comment: "Nice" });
    expect(review.errors.comment).toMatch(
      "The review must be at least 10 characters long",
    );
  });
});
