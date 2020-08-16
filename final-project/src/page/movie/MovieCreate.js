import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Main from "../../layout/Main";
import { Helmet } from "react-helmet";

const TITLE = "CREATE MOVIE";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const MovieCreate = () => {
  const classes = useStyles();
  const [input, setInput] = useState({
    title: "",
    description: "",
    year: "",
    duration: "",
    genre: "",
    rating: "",
    review: "",
    image_url: "",
  });
  const [, setSelectedID] = useState(0);
  const [statusForm, setStatusForm] = useState("create");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (statusForm === "create") {
      axios
        .post(`https://backendexample.sanbersy.com/api/movies`, {
          title: input.title,
          rating: input.rating,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          description: input.description,
          review: input.review,
          image_url: input.image_url,
        })
        .then((res) => {
          console.log(res);
        });
    }
    setStatusForm("create");
    setSelectedID(0);
    setInput({
      title: "",
      description: "",
      year: "",
      duration: "",
      genre: "",
      rating: "",
      review: "",
      image_url: "",
    });
  };

  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "title": {
        setInput({ ...input, title: event.target.value });
        break;
      }
      case "description": {
        setInput({ ...input, description: event.target.value });
        break;
      }
      case "year": {
        setInput({ ...input, year: event.target.value });
        break;
      }
      case "duration": {
        setInput({ ...input, duration: event.target.value });
        break;
      }
      case "genre": {
        setInput({ ...input, genre: event.target.value });
        break;
      }
      case "rating": {
        setInput({ ...input, rating: event.target.value });
        break;
      }
      case "review": {
        setInput({ ...input, review: event.target.value });
        break;
      }
      case "image_url": {
        setInput({ ...input, image_url: event.target.value });
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Main></Main>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Form
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Judul"
              name="title"
              onChange={handleChange}
              value={input.title}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="year"
              label="Tahun"
              type="number"
              onChange={handleChange}
              value={input.year}
              InputProps={{ inputProps: { min: 1980, max: 2020 } }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="rating"
              label="Rating"
              type="number"
              onChange={handleChange}
              value={input.rating}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="duration"
              label="Durasi"
              type="number"
              onChange={handleChange}
              value={input.duration}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="genre"
              label="Genre"
              type="text"
              onChange={handleChange}
              value={input.genre}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="description"
              label="description"
              type="text"
              onChange={handleChange}
              value={input.description}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="review"
              label="review"
              type="text"
              onChange={handleChange}
              value={input.review}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="image_url"
              label="image_url"
              type="text"
              onChange={handleChange}
              value={input.image_url}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Kirim
            </Button>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </>
  );
};

export default MovieCreate;
