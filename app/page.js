"use client";

import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { SignedIn, SignedOut } from "@clerk/nextjs";
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
    <Container
      maxWidth="100%"
      fixed
      bgcolor="#f2f6fc"
      sx={{ height: "100vh", overflow: "auto" }}
    >
      <CustomAppBar />
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to FlashMind AI
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <SignedIn>
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
            href="/flashcards"
          >
            Your Saved FlashCards
          </Button>
        </SignedIn>
        <SignedOut>
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
            href="/sign-in"
          >
            Login for Saved Flashcards
          </Button>
          <Box sx={{ my: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Features
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Typography variant="h6">
                  Effortless Content Creation
                </Typography>
                <Typography>
                  {" "}
                  Transform your notes into study material effortlessly. Just
                  paste your text, and our system will convert it into
                  ready-to-use flashcards.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Intelligent Study Aids</Typography>
                <Typography>
                  {" "}
                  Our AI optimizes your study sessions by generating flashcards
                  that highlight key concepts, helping you retain information
                  more effectively.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Universal Access</Typography>
                <Typography>
                  {" "}
                  Enjoy seamless studying across all your devices, whenever and
                  wherever you need. Your flashcards are always within reach,
                  ensuring you can study anytime.
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ my: 6, textAlign: "center" }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Pricing
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "greay.300",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Pro
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    $5 / month
                  </Typography>
                  <Typography>
                    {" "}
                    Access to Pro flashcard features and storage.
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
                    onClick={handleSubmit}
                  >
                    Choose Pro
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </SignedOut>
      </Box>
    </Container>
  );
}
