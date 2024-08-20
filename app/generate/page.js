"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Image from "next/image";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the import path as necessary
import { useUser } from "@clerk/nextjs";
import React from "react";
import CardList from "../FlippableCard";
import CustomAppBar from "../CustomAppBar";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    // We'll implement the API call here
    setIsLoading(true);
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      const batch = writeBatch(db);
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const collections = userDocSnap.data().flashcards || [];
        if (collections.find((f) => f.name === setName)) {
          alert("Flashcard collection wih the same name already exists.");
        } else {
          collections.push({ setName });
          batch.set(userDocRef, { flashcards: collections }, { merge: true });
        }
      } else {
        batch.set(userDocRef, { flashcards: [{ setName }] });
      }

      const colRef = collection(userDocRef, setName);
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef);
        batch.set(cardDocRef, flashcard);
      });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleCloseDialog();
      router.push("/flashcards");
      setSetName("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <Container
      width="100%"
      fixed
      sx={{
        height: "100vh",
        backgroundColor: "#f2f6fc",
        overflow: "auto",
      }}
    >
      <CustomAppBar />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          sx={{
            mt: 2,
            mr: 2,
            backgroundColor: "#BC8F8F",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#A77D7D",
            },
          }}
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {isLoading && (
            <>
              <Typography variant="h5" component="h2" gutterBottom>
                Generating your flashcards..
              </Typography>
              <Image
                src="/images/loading.gif"
                alt="Loading..."
                width={100}
                height={100}
              />
            </>
          )}
        </Box>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4, width: "100%" }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Generated Flashcards
          </Typography>
          <CardList cards={flashcards} />
        </Box>
      )}

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              mr: 2,
              backgroundColor: "#BC8F8F",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#A77D7D",
              },
            }}
            onClick={handleOpenDialog}
          >
            Save Flashcards
          </Button>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={saveFlashcards}
            sx={{
              mt: 2,
              mr: 2,
              backgroundColor: "#BC8F8F",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#A77D7D",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
