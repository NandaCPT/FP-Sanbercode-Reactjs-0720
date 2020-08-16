import React, { useState, useEffect } from "react";
import axios from "axios";
import Main from "../../layout/Main";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Helmet } from "react-helmet";

const TITLE = "LIST MOVIE";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 5,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "10px auto",
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: 860,
    border: "1px solid #b8b5ad",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const MovieHome = () => {
  const classes = useStyles();
  const [daftarFilm, setDaftarFilm] = useState(null);

  useEffect(() => {
    if (daftarFilm === null) {
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
  }, [daftarFilm]);

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <div className={classes.root}>
        <Main></Main>
        <h1
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}
        >
          LIST MOVIE
        </h1>
        {daftarFilm !== null &&
          daftarFilm.map((item, index) => {
            return (
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.img}
                        src={item.image_url}
                        alt={item.title}
                      />
                    </ButtonBase>
                  </Grid>

                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={4}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          <Link
                            style={{
                              textDecoration: "none",
                              color: "black",
                              textTransform: "uppercase",
                              fontSize: "24px",
                              fontWeight: "bold",
                            }}
                            to={`/movieinfo/${item.id}`}
                          >
                            {" "}
                            {item.title}{" "}
                          </Link>{" "}
                        </Typography>
                        <Typography gutterBottom variant="body2">
                          Year: {item.year}
                          <br />
                          Rating: {item.rating}
                          <br />
                          Genres: {item.genre}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
      </div>
    </>
  );
};

export default MovieHome;
