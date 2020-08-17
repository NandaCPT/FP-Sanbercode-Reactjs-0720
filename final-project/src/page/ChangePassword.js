import React, { useState, useEffect } from "react";
import axios from "axios";
import Main from "../layout/Main";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import { useParams } from "react-router-dom";

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

const ChangePassword = () => {
  let { id } = useParams();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [daftarUser, setDaftarUser] = useState(null);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [selectedID, setSelectedID] = useState(0);
  const [statusForm, setStatusForm] = useState("edit");

  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "username": {
        setInput({ ...input, username: event.target.value });
        break;
      }
      case "password": {
        setInput({ ...input, password: event.target.value });
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    if (statusForm === "edit") {
      axios
        .put(`https://backendexample.sanbersy.com/api/users/${id}`, {
          username: input.username,
          password: input.password,
        })
        .then((res) => {
          console.log(res);
          let dataUser = daftarUser.find((el) => el.id === selectedID);
          dataUser.username = input.username;
          dataUser.password = input.password;
          setDaftarUser([...daftarUser]);
        });
    }
  };

  return (
    <div>
      <Main />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleChangePassword}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              value={input.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={input.password}
            />
            <Link to={"/"}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {
                  alert("Sukses");
                }}
              >
                Submit
              </Button>
            </Link>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </div>
  );
};

export default ChangePassword;
