import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Main from "../../layout/Main";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Helmet } from "react-helmet";

const TITLE = "INFO MOVIE";

const useStyles = makeStyles({
  root: {
    maxWidth: 860,
    margin: "30px auto",
  },
  image: {
    width: 280,
    height: 280,
    margin: "auto",
  },
});

const MovieInfo = () => {
  const classes = useStyles();

  let { id } = useParams();
  const [daftarFilm, setDaftarFilm] = useState(null);

  useEffect(() => {
    if (daftarFilm === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/movies/${id}`)
        .then((res) => {
          setDaftarFilm(res.data);
        });
    }
  });

  return (
    <div>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Card className={classes.root}>
        <Main></Main>
        <CardActionArea>
          {daftarFilm !== null && (
            <div>
              <CardMedia
                className={classes.image}
                component="img"
                alt={daftarFilm.title}
                src={daftarFilm.image_url}
                title={daftarFilm.title}
              />
              <CardContent>
                <Typography
                  align="center"
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ textTransform: "uppercase" }}
                >
                  {daftarFilm.title} ({daftarFilm.year})
                </Typography>
                <Typography
                  align="justify"
                  variant="subtitle2"
                  color="textPrimary"
                  component="p"
                >
                  <strong>Rating:</strong> {daftarFilm.rating}
                  <br />
                  <strong>Genres:</strong> {daftarFilm.genre}
                  <br />
                  <strong>Durasi:</strong> {daftarFilm.duration} menit
                  <br />
                  <strong>Deskripsi:</strong>
                  <br /> {daftarFilm.description}
                  <br />
                  <strong>Review:</strong>
                  <br /> {daftarFilm.review}
                  <br />
                </Typography>
              </CardContent>
            </div>
          )}
        </CardActionArea>
      </Card>
    </div>
  );
};

export default MovieInfo;
