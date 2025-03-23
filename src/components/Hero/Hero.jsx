import React from "react";
import "./Hero.css";
import { Box, TextField, IconButton } from "@radix-ui/themes";
import { MagnifyingGlassIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import Stack from "./Stack.jsx";
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1 className="hero-title">
          Buy and sell your books{" "}
          <span className="hero-span">for the best prices</span>
        </h1>
        <p className="hero-subtitle">
          Find and read more your'll love, and keep track of the books you want
          to read. Be part of the word's largeest community of book lovers on
          Goodreads.
        </p>
        <Box maxWidth="300px">
          <TextField.Root placeholder="Search for Books…" size="3">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Slot>
              <IconButton size="1" variant="ghost">
                <DotsHorizontalIcon height="14" width="14" />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
        </Box>
      </div>
      <div className="right">
        <Stack></Stack>
      </div>
    </section>
  );
};

export default Hero;
