import Button from "@mui/material/Button";
import Content from "./content";

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

async function getData() {
  const res = await fetch(defaultEndpoint, { cache: "force-cache" });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return <Content data={data} defaultEndpoint={defaultEndpoint} />;
}
