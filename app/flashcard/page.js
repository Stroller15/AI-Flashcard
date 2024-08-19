"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSearchParams } from "next/navigation";
import { collection, doc, getDocs } from "firebase/firestore";
import { Container, Button } from "@mui/material";
import { db } from "../../firebase";
import CardList from "../FlippableCard";
import CustomAppBar from "../CustomAppBar";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [search, user]);


  if (!isLoaded || !isSignedIn) {
    return <></>
  }

  return (
    <Container maxWidth="100%" fixed bgcolor="#f2f6fc">
      <CustomAppBar />
      <CardList cards={flashcards} />
    </Container>
  );
}
