import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

type plusProps = {
  handlePlusClick: () => void;
};

export const Plus = ({ handlePlusClick }: plusProps) => (
  <Button onClick={handlePlusClick}>
    <Card sx={{ p: 2 }}>
      <CardMedia
        component="img"
        image="/Plus.png"
        alt="Add Course"
        sx={{ margin: "auto" }}
      />
      <CardContent sx={{ flexGrow: 1, textAlign: "center", marginTop: "16px" }}>
        <Typography
          className="font-bold"
          gutterBottom
          variant="h5"
          sx={{ textTransform: "none" }}
        >
          Add Course
        </Typography>
      </CardContent>
    </Card>
  </Button>
);
