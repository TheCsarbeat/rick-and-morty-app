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
  FormControl,
} from "@mui/material";

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
    updatePage((prev) => {
      return {
        ...prev,
        current: page?.next,
      };
    });
  }

  function handleOnSubmitSearch(e) {
    e.preventDefault();

    const value = query || "";
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

    updatePage({
      current: endpoint,
    });
  }

  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        MortyDex
      </Typography>
      <FormControl>
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          sx={{ color: "primary.main" }}
          value={query}
          onChange={handleOnChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOnSubmitSearch}
        >
          Search
        </Button>
      </FormControl>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ justifyContent: "center" }}
      >
        {results.map((character) => (
          <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
            <Paper item key={character.id} xs={12} sm={6} md={4} lg={3}>
              <Box>
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
