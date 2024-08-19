import { Typography, AppBar, Toolbar, Button } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CustomAppBar() {
  const router = useRouter();
  const SignOutButton = () => {
    const { signOut } = useClerk();

    return (
      <button onClick={() => signOut({ redirectUrl: "/" })}>Sign out</button>
    );
  };
  const handleClick = () => {
    router.push("/");
  };
  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: `url('/images/brown_image.jpg')`, // Replace with the path relative to the public directory
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={handleClick}
        >
          Flashcard SaaS
        </Typography>
        <SignedOut>
          <Button color="inherit" href="/sign-in">
            Login
          </Button>
          <Button color="inherit" href="/sign-up">
            Sign Up
          </Button>
        </SignedOut>
        <SignedIn>
          <Button color="inherit" href="/flashcards">
            Saved Cards
          </Button>
          <UserButton signOutCallback={SignOutButton} />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
