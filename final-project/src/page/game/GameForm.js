import React, { useState, useEffect } from "react";
import axios from "axios";
import Main from "../../layout/Main";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Draggable from "react-draggable";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FilterListSharpIcon from "@material-ui/icons/FilterListSharp";
import { Helmet } from "react-helmet";

const TITLE = "FORM GAME";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const GameForm = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [daftarGame, setDaftarGame] = useState(null);
  const [input, setInput] = useState({
    name: "",
    genre: "",
    singlePlayer: "",
    multiplayer: "",
    platform: "",
    release: "",
    image_url: "",
  });
  const [selectedID, setSelectedID] = useState(0);
  const [statusForm, setStatusForm] = useState("edit");
  const [inputFilter, setInputFIlter] = useState({
    releaseStart: 0,
    releaseEnd: 2020,
    singleValue: 0,
    multiValue: 0,
  });

  useEffect(() => {
    if (daftarGame === null) {
      axios.get(`https://backendexample.sanbersy.com/api/games`).then((res) => {
        setDaftarGame(
          res.data.map((el) => {
            return {
              id: el.id,
              name: el.name,
              genre: el.genre,
              singlePlayer: el.singlePlayer,
              multiplayer: el.multiplayer,
              release: el.release,
              platform: el.platform,
              image_url: el.image_url,
            };
          })
        );
      });
    }
  }, [daftarGame]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (statusForm === "edit") {
      axios
        .put(`https://backendexample.sanbersy.com/api/games/${selectedID}`, {
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
          let dataGame = daftarGame.find((el) => el.id === selectedID);
          dataGame.name = input.name;
          dataGame.multiplayer = input.multiplayer;
          dataGame.release = input.release;
          dataGame.singlePlayer = input.singlePlayer;
          dataGame.genre = input.genre;
          dataGame.platform = input.platform;
          dataGame.image_url = input.image_url;
          setDaftarGame([...daftarGame]);
        });
    }
  };

  const handleEdit = (event) => {
    setOpen(true);
    let idGame = parseInt(event);
    let dataGame = daftarGame.find((el) => el.id === idGame);
    setInput({
      name: dataGame.name,
      genre: dataGame.genre,
      release: dataGame.release,
      singlePlayer: dataGame.singlePlayer,
      multiplayer: dataGame.multiplayer,
      platform: dataGame.duration,
      image_url: dataGame.image_url,
    });
    setSelectedID(idGame);
    setStatusForm("edit");
  };

  const handleDelete = (event) => {
    let idGame = parseInt(event);
    let newDaftarGame = daftarGame.filter((el) => el.id != idGame);

    axios
      .delete(`https://backendexample.sanbersy.com/api/games/${idGame}`)
      .then((res) => {
        console.log(res);
      });
    setDaftarGame([...newDaftarGame]);
  };

  const submitFilter = (e) => {
    e.preventDefault();
    axios.get(`https://backendexample.sanbersy.com/api/games`).then((res) => {
      let resDataGame = res.data.map((el) => {
        return {
          id: el.id,
          name: el.name,
          genre: el.genre,
          release: el.release,
          platform: el.platform,
          image_url: el.image_url,
          singlePlayer: el.singlePlayer,
          multiplayer: el.multiplayer,
        };
      });

      let filterDataGame = resDataGame.filter(
        (x) =>
          x.release >= inputFilter.releaseStart &&
          x.release <= inputFilter.releaseEnd &&
          x.singlePlayer == inputFilter.singleValue &&
          x.multiplayer == inputFilter.multiValue
      );
      setDaftarGame([...filterDataGame]);
    });
  };

  const handleChangeFilter = (e) => {
    switch (e.target.name) {
      case "releaseStart": {
        setInputFIlter({ ...inputFilter, releaseStart: e.target.value });
        break;
      }
      case "releaseEnd": {
        setInputFIlter({ ...inputFilter, releaseEnd: e.target.value });
        break;
      }
      case "singleValue": {
        setInputFIlter({ ...inputFilter, singleValue: e.target.value });
        break;
      }
      case "multiValue": {
        setInputFIlter({ ...inputFilter, multiValue: e.target.value });
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Main />
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Edit Form
          </DialogTitle>
          <DialogContent>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmit}>
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
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {
                      alert("Sukses");
                    }}
                  >
                    Kirim
                  </Button>{" "}
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </form>
              </div>
              <Box mt={8}></Box>
            </Container>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <div className={classes.paper}>
          <form
            className={classes.root}
            autoComplete="off"
            onSubmit={submitFilter}
          >
            <FilterListSharpIcon />
            <TextField
              id="standard-basic"
              name="releaseStart"
              type="number"
              label="Release Start"
              onChange={handleChangeFilter}
              value={inputFilter.releaseStart}
              InputProps={{ inputProps: { min: 0, max: 2020 } }}
            />
            <TextField
              id="standard-basic"
              name="releaseEnd"
              type="number"
              label="Release End"
              onChange={handleChangeFilter}
              value={inputFilter.releaseEnd}
              InputProps={{ inputProps: { min: 0, max: 2020 } }}
            />
            <FilterListSharpIcon />
            <TextField
              id="standard-basic"
              label="Single Player"
              name="singleValue"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 1 } }}
              onChange={handleChangeFilter}
              value={inputFilter.singleValue}
            />
            <TextField
              id="standard-basic"
              label="Multi Player"
              name="multiValue"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 1 } }}
              onChange={handleChangeFilter}
              value={inputFilter.multiValue}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              FILTER
            </Button>
          </form>
        </div>
      </div>
      <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        FORM GAME
      </h1>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nama</StyledTableCell>
              <StyledTableCell>Release</StyledTableCell>
              <StyledTableCell>Genre</StyledTableCell>
              <StyledTableCell>Single</StyledTableCell>
              <StyledTableCell>Multi</StyledTableCell>
              <StyledTableCell>Platform</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {daftarGame !== null &&
              daftarGame.map((item, index) => {
                return (
                  <tr key={index}>
                    <StyledTableCell align="left">{item.name}</StyledTableCell>
                    <StyledTableCell align="left">
                      {item.release}
                    </StyledTableCell>
                    <StyledTableCell align="left">{item.genre}</StyledTableCell>
                    <StyledTableCell align="left">
                      {item.singlePlayer}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.multiplayer}
                    </StyledTableCell>
                    <StyledTableCell>{item.platform}</StyledTableCell>
                    <StyledTableCell align="left">
                      {item.image_url}
                    </StyledTableCell>
                    <IconButton
                      aria-label="Edit"
                      onClick={() => handleEdit(item.id)}
                      value={item.id}
                      variant="contained"
                      color="primary"
                    >
                      {" "}
                      <EditIcon />{" "}
                    </IconButton>
                    <br /> <br />
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(item.id)}
                      value={item.id}
                      variant="contained"
                      color="secondary"
                    >
                      {" "}
                      <DeleteIcon />{" "}
                    </IconButton>
                  </tr>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GameForm;
