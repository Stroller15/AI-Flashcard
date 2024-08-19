"use client";

import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import getStripe from "@/utils/get-stripe";
import CustomAppBar from "./CustomAppBar";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };
  const SignOutButton = () => {
    const { signOut } = useClerk();

    return (
      <button onClick={() => signOut({ redirectUrl: "/" })}>Sign out</button>
    );
  };
  return (
    <Container maxWidth="100%" fixed bgcolor="#f2f6fc">
      <CustomAppBar />
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
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
          href="/generate"
        >
          Get Started
        </Button>
        <SignedIn>
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              mr: 2,
              backgroundColor: "#BC8F8F",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#A77D7D",
              },
            }}
            href="/flashcards"
          >
            Your Saved FlashCards
          </Button>
        </SignedIn>
        <SignedOut>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
            href="/sign-in"
          >
            Login for Saved Flashcards
          </Button>
        </SignedOut>

        <Box sx={{ my: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={4}>
            {/* Feature items */}
          </Grid>
        </Box>
        <Box sx={{ my: 6, textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 5,
                ml: 5,
                backgroundColor: "#BC8F8F",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#A77D7D",
                },
              }}
              onClick={handleSubmit}
            >
              Subscribe to our Pro version
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
