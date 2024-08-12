import React, { useState } from "react";
import { Paper, Typography, Box } from "@mui/material";

function Flashcard({ number, question, answer }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <Paper
      elevation={3}
      onClick={handleFlip}
      sx={{
        padding: "20px",
        width: "100%",
        maxWidth: "400px",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        userSelect: "none",
        transition: "transform 0.6s",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backfaceVisibility: "hidden",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          {!flipped && question && (
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Q{number}
            </Typography>
          )}
          {flipped ? answer : question}
        </Typography>
      </Box>
    </Paper>
  );
}

export default Flashcard;
