import * as React from "react";

import CardPanel from "./cardPanel";

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

async function getCharacter(id) {
  const res = await fetch(`${defaultEndpoint}${id}`, { cache: "force-cache" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Character({ params }) {
  const characterId = params.characterId;
  const character = await getCharacter(characterId);
  return <CardPanel character={character} />;
}
