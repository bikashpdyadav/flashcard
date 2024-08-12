import React, { useState, useEffect } from "react";
import axios from "axios";
import Flashcard from "./FlashCard";
import { Container, Button, Box } from "@mui/material";

function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/flashcards")
      .then((response) => setFlashcards(response.data))
      .catch((error) => console.error("Error fetching flashcards:", error));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
  };

  if (flashcards.length === 0) return <p>Loading...</p>;

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Flashcard
        number={currentIndex + 1}
        question={flashcards[currentIndex].question}
        answer={flashcards[currentIndex].answer}
      />
      <Box mt={3} display="flex" justifyContent="space-between" width="100%">
        <Button variant="contained" color="primary" onClick={handlePrevious}>
          Previous
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Container>
  );
}

export default FlashcardList;
