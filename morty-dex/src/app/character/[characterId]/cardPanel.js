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
  CardActions,
  Button,
  Popover,
} from "@mui/material";
import { usePathname } from "next/navigation";

export default function CardPanel({ character }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const pathname = usePathname();
  const [myLocation, setMyLocation] = React.useState("");

  React.useEffect(() => {
    setMyLocation(window.location.href);
  });

  const handleClick = (event) => {
    copyToClip();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  async function copyToClip() {
    await navigator.clipboard.writeText(myLocation);
  }

  const { name, image, status, gender, species, location, origin } = character;
  return (
    <Box>
      <Link href="/">
        <Button variant="contained" color="primary" sx={{ mt: 4, ml: 4 }}>
          Back to Home
        </Button>
      </Link>
      <Container
        maxWidth="lg"
        sx={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ minWidth: 345, height: 550 }}>
          <CardMedia sx={{ height: 300 }} image={image} title="name" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Box color="secondary.main">
              <Typography>
                <Box component="span" fontWeight="bold">
                  💾Status:{" "}
                </Box>
                {status}
              </Typography>
              <Typography>
                <Box component="span" fontWeight="bold">
                  🚻Gender:{" "}
                </Box>
                {gender}
              </Typography>
              <Typography>
                <Box component="span" fontWeight="bold">
                  🦍Species:{" "}
                </Box>
                {species}
              </Typography>
              <Typography>
                <Box component="span" fontWeight="bold">
                  🌍Last Known Location:{" "}
                </Box>
                {location.name}
              </Typography>
              <Typography>
                <Box component="span" fontWeight="bold">
                  🕔Origin:{" "}
                </Box>
                {origin.name}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "right" }}>
            <Button size="small" aria-describedby={id} onClick={handleClick}>
              Share
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }}>Link copied!</Typography>
            </Popover>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}
