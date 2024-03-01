import * as React from "react";
import Link from "next/link";

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

async function getCharacter(id) {
  const res = await fetch(`${defaultEndpoint}${id}`, { cache: "force-cache" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Character({ params }) {
  console.log(params);
  const characterId = params.characterId;
  const character = await getCharacter(characterId);
  console.log(character);
  const { name, image, status, gender, species, location, origin } = character;
  return (
    <main>
      <h1 className="title">{name}</h1>

      <div className="profile">
        <div className="profile-image">
          <img src={image} alt={name} />
        </div>
        <div className="profile-details">
          <h2>Character Details</h2>
          <ul>
            <li>
              <strong>Name:</strong> {name}
            </li>
            <li>
              <strong>Status:</strong> {status}
            </li>
            <li>
              <strong>Gender:</strong> {gender}
            </li>
            <li>
              <strong>Species:</strong> {species}
            </li>
            <li>
              <strong>Location:</strong> {location?.name}
            </li>
            <li>
              <strong>Originally From:</strong> {origin?.name}
            </li>
          </ul>
        </div>
      </div>

      <p className="back">
        <Link href="/"></Link>
      </p>
    </main>
  );
}
