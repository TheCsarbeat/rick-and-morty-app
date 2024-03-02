"use client";
import * as React from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

export default function Home() {
  const [score, setScore] = React.useState(0);
  const [character, setCharacter] = React.useState(null);

  const handleGuess = (guess) => {
    if (guess === character.status) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore(0);
    }
  };

  React.useEffect(() => {
    async function getRandomCharacter() {
      while (true) {
        const randomId = Math.floor(Math.random() * 826) + 1;
        const res = await fetch(`${defaultEndpoint}${randomId}`, {
          cache: "force-cache",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        // if character status is different from unknown, return the character
        const character = await res.json();
        if (character.status !== "unknown") {
          return character;
        }
      }
    }

    getRandomCharacter().then((newCharacter) => setCharacter(newCharacter));
  }, [score]);

  // Fetch initial random character when the component mounts
  React.useEffect(() => {
    async function getRandomCharacter() {
      while (true) {
        const randomId = Math.floor(Math.random() * 826) + 1;
        const res = await fetch(`${defaultEndpoint}${randomId}`, {
          cache: "force-cache",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        // if character status is different from unknown, return the character
        if (res.status !== "unknown") {
          return res.json();
        }
      }
    }

    getRandomCharacter().then((initialCharacter) =>
      setCharacter(initialCharacter)
    );
  }, []);

  if (!character) {
    return <div>Loading...</div>;
  }

  const { name, image, status, gender, species, location, origin } = character;
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mx: 4, mt: 4 }}
      >
        <Link href="/">
          <Button variant="contained" color="primary">
            Back to Home
          </Button>
        </Link>
        <Typography variant="h4">Score: {score}</Typography>
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ textAlign: "center", mb: 8 }}>
          Guess whos alive😄 or dead💀
        </Typography>

        <Card sx={{ minWidth: 345, height: 500 }}>
          <CardMedia sx={{ height: 300 }} image={image} title="name" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Box color="secondary.main">
              <Typography>
                <Box component="span" fontWeight="bold">
                  Gender:{" "}
                </Box>
                {gender}
              </Typography>
              <Typography>
                <Box component="span" fontWeight="bold">
                  Species:{" "}
                </Box>
                {species}
              </Typography>
              <Typography>
                <Box component="span" fontWeight="bold">
                  Location:{" "}
                </Box>
                {location.name}
              </Typography>
              <Typography>
                <Box component="span" fontWeight="bold">
                  Origin:{" "}
                </Box>
                {origin.name}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Box
          mt={2}
          textAlign="center"
          sx={{ width: 345, display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleGuess("Alive")}
          >
            😄Alive
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleGuess("Dead")}
          >
            💀Dead
          </Button>
        </Box>
      </Container>
    </>
  );
}
