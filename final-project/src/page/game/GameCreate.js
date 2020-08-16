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

const TITLE = "CREATE GAME";

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

const GameCreate = () => {
  const classes = useStyles();
  const [input, setInput] = useState({
    name: "",
    genre: "",
    singlePlayer: "",
    multiplayer: "",
    platform: "",
    release: "",
    image_url: "",
  });
  const [, setSelectedID] = useState(0);
  const [statusForm, setStatusForm] = useState("create");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (statusForm === "create") {
      axios
        .post(`https://backendexample.sanbersy.com/api/games`, {
          name: input.name,
          genre: input.genre,
          release: input.release,
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          platform: input.platform,
          image_url: input.image_url,
        })
        .then((res) => {
          console.log(res);
        });
    }
    setStatusForm("create");
    setSelectedID(0);
    setInput({
      name: "",
      genre: "",
      singlePlayer: "",
      multiplayer: "",
      platform: "",
      release: "",
      image_url: "",
    });
  };

  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "name": {
        setInput({ ...input, name: event.target.value });
        break;
      }
      case "genre": {
        setInput({ ...input, genre: event.target.value });
        break;
      }
      case "singlePlayer": {
        setInput({ ...input, singlePlayer: event.target.value });
        break;
      }
      case "multiplayer": {
        setInput({ ...input, multiplayer: event.target.value });
        break;
      }
      case "platform": {
        setInput({ ...input, platform: event.target.value });
        break;
      }
      case "release": {
        setInput({ ...input, release: event.target.value });
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
              name="name"
              onChange={handleChange}
              value={input.name}
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
              required
              fullWidth
              name="platform"
              label="Platform"
              type="text"
              onChange={handleChange}
              value={input.platform}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="singlePlayer"
              label="Single Player"
              type="number"
              onChange={handleChange}
              value={input.singlePlayer}
              InputProps={{ inputProps: { min: 0, max: 1 } }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="multiplayer"
              label="Multi Player"
              type="number"
              onChange={handleChange}
              value={input.multiplayer}
              InputProps={{ inputProps: { min: 0, max: 1 } }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="release"
              label="release"
              type="number"
              onChange={handleChange}
              value={input.release}
              InputProps={{ inputProps: { min: 1980, max: 2020 } }}
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

export default GameCreate;
