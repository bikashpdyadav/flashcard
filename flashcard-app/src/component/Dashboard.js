import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Paper,
  Typography,
  Grid,
  IconButton,
  Box,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

function Dashboard() {
  const [flashcards, setFlashcards] = useState([]);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [editingCard, setEditingCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = () => {
    axios
      .get("http://localhost:5000/flashcards")
      .then((response) => setFlashcards(response.data))
      .catch((error) => console.error("Error fetching flashcards:", error));
  };

  const handleAddFlashcard = () => {
    axios
      .post("http://localhost:5000/flashcards", newCard)
      .then(() => {
        fetchFlashcards();
        setNewCard({ question: "", answer: "" });
        toast.success("Flashcard added successfully!");
      })
      .catch((error) => {
        console.error("Error adding flashcard:", error);
        toast.error("Failed to add flashcard.");
      });
  };

  const handleEditFlashcard = (id) => {
    const cardToEdit = flashcards.find((card) => card.id === id);
    setEditingCard({ ...cardToEdit });
  };

  const handleUpdateFlashcard = () => {
    if (editingCard) {
      axios
        .put(`http://localhost:5000/flashcards/${editingCard.id}`, editingCard)
        .then(() => {
          fetchFlashcards();
          setEditingCard(null);
          toast.success("Flashcard updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating flashcard:", error);
          toast.error("Failed to update flashcard.");
        });
    }
  };

  const handleCancelEdit = () => {
    setEditingCard(null);
    toast.info("Edit canceled.");
  };

  const handleDeleteFlashcard = (id) => {
    if (window.confirm("Are you sure you want to delete this flashcard?")) {
      axios
        .delete(`http://localhost:5000/flashcards/${id}`)
        .then(() => {
          fetchFlashcards();
          toast.success("Flashcard deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting flashcard:", error);
          toast.error("Failed to delete flashcard.");
        });
    }
  };

  const handleChange = (e) => {
    setEditingCard({ ...editingCard, [e.target.name]: e.target.value });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the flashcards array to get the current page's flashcards
  const currentFlashcards = flashcards.slice(startIndex, endIndex);
  const totalPages = Math.ceil(flashcards.length / itemsPerPage);

  return (
    <Container maxWidth="md">
      <ToastContainer />
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box mb={4}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Question"
              variant="outlined"
              value={newCard.question}
              onChange={(e) =>
                setNewCard({ ...newCard, question: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Answer"
              variant="outlined"
              value={newCard.answer}
              onChange={(e) =>
                setNewCard({ ...newCard, answer: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddFlashcard}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
      <List>
        {currentFlashcards.map((card) => (
          <ListItem key={card.id}>
            <Paper style={{ padding: "16px", width: "100%" }}>
              <Grid container spacing={2} alignItems="center">
                {editingCard && editingCard.id === card.id ? (
                  <>
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        label="Question"
                        variant="outlined"
                        name="question"
                        value={editingCard.question}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        label="Answer"
                        variant="outlined"
                        name="answer"
                        value={editingCard.answer}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        color="primary"
                        onClick={handleUpdateFlashcard}
                      >
                        <SaveIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton color="secondary" onClick={handleCancelEdit}>
                        <CancelIcon />
                      </IconButton>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={5}>
                      <Typography variant="body1">{card.question}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body1">{card.answer}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditFlashcard(card.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteFlashcard(card.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>
          </ListItem>
        ))}
      </List>
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}

export default Dashboard;
