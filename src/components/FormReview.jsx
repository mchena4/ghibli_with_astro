import React, { useState } from "react";
import { validateReview } from "../schemas/review";

const initial = { name: "", score: "", comment: "" };

export default function FormReview() {
  const [values, setValues] = useState(initial);
  const [reviews, setReviews] = useState([]);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const result = validateReview(values);

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setReviews((prev) => [{ ...values, id: Date.now() }, ...prev]);
    setValues(initial);
    setErrors({});
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            value={values.name}
            type="text"
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="score">Score:</label>
          <input
            value={values.score}
            type="text"
            name="score"
            onChange={handleChange}
          />
          {errors.score && <p className="text-red-500">{errors.score}</p>}
        </div>

        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            value={values.comment}
            type="text"
            name="comment"
            onChange={handleChange}
          />
          {errors.comment && <p className="text-red-500">{errors.comment}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {reviews.length > 0 && (
        <ul>
          {reviews.map((r) => (
            <li className="text-xl">
              <p>
                {r.name} - {r.score}
              </p>
              <p>{r.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
