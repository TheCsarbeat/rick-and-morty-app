"use client";
import * as React from "react";
import Link from "next/link";
import Container from "@mui/material/Container";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Content({ data, defaultEndpoint }) {
  const { info, results: defaultResults = [] } = data;

  const [results, updateResults] = React.useState(defaultResults);

  const [page, updatePage] = React.useState({
    ...info,
    current: defaultEndpoint,
  });
  const { current } = page;

  const [query, setQuery] = React.useState("");

  const handleOnChange = (e) => {
    setQuery(e.target.value);
  };

  React.useEffect(() => {
    if (current === defaultEndpoint) return;

    async function request() {
      const res = await fetch(current);
      console.log(res);
      //validate response
      if (!res.ok) {
        // No more characters
        updatePage((prev) => {
          return {
            ...prev,
            next: null,
          };
        });
      }
      const nextData = await res.json();

      console.log(nextData);

      updatePage({
        current,
        ...nextData.info,
      });

      if (!nextData.info?.prev) {
        updateResults(nextData.results);
        return;
      }

      updateResults((prev) => {
        return [...prev, ...nextData.results];
      });
    }

    request();
  }, [current]);

  function handleLoadMore() {
    // If there is no next page, don't do anything
    if (!page?.next) return;
    updatePage((prev) => {
      return {
        ...prev,
        current: page?.next,
      };
    });
  }

  async function handleOnSubmitSearch() {
    const value = query || "";
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

    try {
      const res = await fetch(endpoint);
      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.error === "There is nothing here") {
          return;
        } else {
          throw new Error(errorData.error);
        }
      }

      const searchData = await res.json();
      updatePage({
        current: endpoint,
        ...searchData.info,
      });

      updateResults(searchData.results);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  const handleKeypress = (e) => {
    console.log(e.keyCode);
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleOnSubmitSearch();
    }
  };

  // reload page
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <Link href={"/"} onClick={handleReload}>
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          MortyDex
        </Typography>
      </Link>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link href={"/game"}>
          <Button variant="contained" color="primary" sx={{ mt: 4, ml: 4 }}>
            Play Game
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 4,
        }}
      >
        <Box sx={{ bgcolor: "background.paper" }}>
          <TextField
            id="outlined-search"
            label="Search"
            type="search"
            placeholder="Search by name"
            InputLabelProps={{
              sx: {
                color: "white",
                opacity: 0.5,
              },
            }}
            sx={{
              input: {
                "&::placeholder": {
                  color: "white",
                  opacity: 1,
                },
              },
            }}
            value={query}
            onChange={handleOnChange}
            onKeyDown={handleKeypress}
          />
          <IconButton
            variant="contained"
            color="primary"
            onClick={handleOnSubmitSearch}
            sx={{ height: "100%", px: 2 }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ justifyContent: "center" }}
      >
        {results.map((character) => (
          <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
            <Paper item key={character.id} xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ ":hover": { color: "primary.main" } }}>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {character.name}
                </Typography>
                <Link href={`/character/${character.id}`}>
                  <img
                    src={character.image}
                    alt={character.name}
                    width="100%"
                  />
                </Link>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color:
                        character.status === "Alive"
                          ? "primary.main"
                          : character.status === "Dead"
                          ? "error.main"
                          : "text.primary",
                      textAlign: "center",
                    }}
                  >
                    {character.status === "Alive"
                      ? "😄"
                      : character.status === "Dead"
                      ? "💀"
                      : "❓"}
                    {character.status}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          onClick={handleLoadMore}
          variant="contained"
          color="primary"
          size="large"
        >
          Load More
        </Button>
      </Box>
    </Container>
  );
}
