import React, { useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const FlippableCard = ({ data }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <StyledCard onClick={handleFlip}>
      <CardInner flipped={flipped}>
        <CardFace front>
          <CardContent>
            <Typography variant="h5" component="div">
              {data.front}
            </Typography>
          </CardContent>
        </CardFace>
        <CardFace back>
          <CardContent>
            <Typography variant="h5" component="div">
              {data.back}
            </Typography>
          </CardContent>
        </CardFace>
      </CardInner>
    </StyledCard>
  );
};

// Styled component for the card container
const StyledCard = styled(Card)({
  cursor: "pointer",
  width: "300px",
  height: "200px",
  perspective: "1000px",
  margin: "16px",
  position: "relative",
});

// Styled component for the inner card that handles the flip
const CardInner = styled("div")(({ flipped }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  transformStyle: "preserve-3d",
  transition: "transform 0.6s",
}));

// Styled component for each face of the card
const CardFace = styled("div")(({ front, back }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: front ? "rotateY(0deg)" : "rotateY(180deg)",
  zIndex: front ? 2 : 1, // Ensure the front face is on top when not flipped
}));

const CardList = ({ cards }) => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {cards.map((card, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <FlippableCard data={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardList;
