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

const TITLE = "FORM MOVIE";

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
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
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

const MovieForm = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [daftarFIlm, setDaftarFilm] = useState(null);
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
  const [selectedID, setSelectedID] = useState(0);
  const [statusForm, setStatusForm] = useState("edit");
  const [inputFilter, setInputFIlter] = useState({
    yearStart: 0,
    yearEnd: 2020,
    ratingStart: 0,
    ratingEnd: 10,
    durationStart: 0,
    durationEnd: 300,
  });

  useEffect(() => {
    if (daftarFIlm === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/movies`)
        .then((res) => {
          setDaftarFilm(
            res.data.map((el) => {
              return {
                id: el.id,
                title: el.title,
                description: el.description,
                year: el.year,
                duration: el.duration,
                genre: el.genre,
                rating: el.rating,
                review: el.review,
                image_url: el.image_url,
              };
            })
          );
        });
    }
  }, [daftarFIlm]);

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

  const submitFilter = (e) => {
    e.preventDefault();
    axios.get(`https://backendexample.sanbersy.com/api/movies`).then((res) => {
      let resDaftarFilm = res.data.map((el) => {
        return {
          id: el.id,
          title: el.title,
          description: el.description,
          year: el.year,
          duration: el.duration,
          genre: el.genre,
          rating: el.rating,
          review: el.review,
          image_url: el.image_url,
        };
      });

      let filterDaftarFilm = resDaftarFilm.filter(
        (x) =>
          x.year >= inputFilter.yearStart &&
          x.year <= inputFilter.yearEnd &&
          x.rating >= inputFilter.ratingStart &&
          x.rating <= inputFilter.ratingEnd &&
          x.duration >= inputFilter.durationStart &&
          x.duration <= inputFilter.durationEnd
      );
      setDaftarFilm([...filterDaftarFilm]);
    });
  };

  const handleChangeFilter = (e) => {
    switch (e.target.name) {
      case "yearStart": {
        setInputFIlter({ ...inputFilter, yearStart: e.target.value });
        break;
      }
      case "yearEnd": {
        setInputFIlter({ ...inputFilter, yearEnd: e.target.value });
        break;
      }
      case "ratingStart": {
        setInputFIlter({ ...inputFilter, ratingStart: e.target.value });
        break;
      }
      case "ratingEnd": {
        setInputFIlter({ ...inputFilter, ratingEnd: e.target.value });
        break;
      }
      case "durationStart": {
        setInputFIlter({ ...inputFilter, durationStart: e.target.value });
        break;
      }
      case "durationEnd": {
        setInputFIlter({ ...inputFilter, durationEnd: e.target.value });
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
        .put(`https://backendexample.sanbersy.com/api/movies/${selectedID}`, {
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
          let dataFilm = daftarFIlm.find((el) => el.id === selectedID);
          dataFilm.title = input.title;
          dataFilm.rating = input.rating;
          dataFilm.year = input.year;
          dataFilm.duration = input.duration;
          dataFilm.genre = input.genre;
          dataFilm.description = input.description;
          dataFilm.review = input.review;
          dataFilm.image_url = input.image_url;
          setDaftarFilm([...daftarFIlm]);
        });
    }
  };

  const handleEdit = (event) => {
    setOpen(true);
    let idFilm = parseInt(event);
    let dataFilm = daftarFIlm.find((el) => el.id === idFilm);
    setInput({
      title: dataFilm.title,
      year: dataFilm.year,
      rating: dataFilm.rating,
      genre: dataFilm.genre,
      description: dataFilm.description,
      duration: dataFilm.duration,
      review: dataFilm.review,
      image_url: dataFilm.image_url,
    });
    setSelectedID(idFilm);
    setStatusForm("edit");
  };

  const handleDelete = (event) => {
    let idFilm = parseInt(event);
    let newDaftarFilm = daftarFIlm.filter((el) => el.id != idFilm);

    axios
      .delete(`https://backendexample.sanbersy.com/api/movies/${idFilm}`)
      .then((res) => {
        console.log(res);
      });
    setDaftarFilm([...newDaftarFilm]);
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
            noValidate
            autoComplete="off"
            onSubmit={submitFilter}
          >
            <FilterListSharpIcon />
            <TextField
              id="standard-basic"
              name="yearStart"
              type="number"
              label="Year Start"
              onChange={handleChangeFilter}
              value={inputFilter.yearStart}
            />
            <TextField
              id="standard-basic"
              name="yearEnd"
              type="number"
              label="Year End"
              onChange={handleChangeFilter}
              value={inputFilter.yearEnd}
            />
            <FilterListSharpIcon />
            <TextField
              id="standard-basic"
              label="Rating Start"
              name="ratingStart"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              onChange={handleChangeFilter}
              value={inputFilter.ratingStart}
            />
            <TextField
              id="standard-basic"
              label="Rating End"
              name="ratingEnd"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              onChange={handleChangeFilter}
              value={inputFilter.ratingEnd}
            />
            <FilterListSharpIcon />
            <TextField
              id="standard-basic"
              label="Duration Start"
              name="durationStart"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 500 } }}
              onChange={handleChangeFilter}
              value={inputFilter.durationStart}
            />
            <TextField
              id="standard-basic"
              label="Duration End"
              name="durationEnd"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 500 } }}
              onChange={handleChangeFilter}
              value={inputFilter.durationEnd}
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
        FORM MOVIE
      </h1>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Judul</StyledTableCell>
              <StyledTableCell>Tahun</StyledTableCell>
              <StyledTableCell>Rating</StyledTableCell>
              <StyledTableCell>Durasi</StyledTableCell>
              <StyledTableCell>Genre</StyledTableCell>
              <StyledTableCell>Deskripsi</StyledTableCell>
              <StyledTableCell>Review</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {daftarFIlm !== null &&
              daftarFIlm.map((item, index) => {
                daftarFIlm.sort((a, b) => (a.rating < b.rating ? 1 : -1));

                return (
                  <tr key={index}>
                    <StyledTableCell align="left">{item.title}</StyledTableCell>
                    <StyledTableCell align="left">{item.year}</StyledTableCell>
                    <StyledTableCell align="left">
                      {item.rating}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.duration} menit
                    </StyledTableCell>
                    <StyledTableCell align="left">{item.genre}</StyledTableCell>
                    <StyledTableCell
                      my={2}
                      textOverflow="ellipsis"
                      overflow="hidden"
                      align="left"
                    >
                      {item.description}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {item.review}
                    </StyledTableCell>
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

export default MovieForm;
