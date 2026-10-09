import React, { useState } from "react";

export default function SearchBar({ films }) {
  const [query, setQuery] = useState("");
  const [director, setDirector] = useState("all");

  const directors = [...new Set(films.map((f) => f.director))];

  const filteredFilms = films.filter(
    (f) =>
      f.title.toLowerCase().includes(query.toLowerCase()) &&
      (director === "all" ||
        f.director.toLowerCase() === director.toLowerCase()),
  );

  return (
    <div>
      <div className="mb-6 flex flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title..."
          className=" w-full rounded-2xl bg-zinc-900 px-4 py-2"
        />
        <select
          onChange={(e) => setDirector(e.target.value)}
          value={director}
          className="rounded-2xl bg-zinc-900 px-4 py-2"
        >
          <option value={"all"}>All directors</option>
          {directors.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <p className="p-5"> {filteredFilms.length} Films </p>

      <div className="grid grid-cols-3 gap-4 p-5">
        {filteredFilms.map((film) => (
          <a
            href={`movie/${film.id}`}
            className="group block overflow-hidden rounded-xl bg-zinc-900 cursor-pointer transition-all hover:scale-101"
          >
            <img
              transition:name={`img-${film.id}`}
              src={film.image}
              alt={film.image}
              loading="lazy"
              className="aspect-2/3 w-full object-cover"
            />

            <div className="p-3">
              <h2 className="font-semibold group-hover:text-amber-400">
                {film.title}
              </h2>
              <p className="text-sm text-zinc-400">{film.release_date}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
