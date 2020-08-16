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

const TITLE = "GAME INFO";

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

const GameInfo = () => {
  const classes = useStyles();

  let { id } = useParams();
  const [daftarGame, setDaftarGame] = useState(null);

  useEffect(() => {
    if (daftarGame === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/games/${id}`)
        .then((res) => {
          setDaftarGame(res.data);
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
          {daftarGame !== null && (
            <div>
              <CardMedia
                className={classes.image}
                component="img"
                alt={daftarGame.name}
                src={daftarGame.image_url}
                name={daftarGame.name}
              />
              <CardContent>
                <Typography
                  align="center"
                  gutterBottom
                  variant="h5"
                  component="h2"
                  style={{ textTransform: "uppercase" }}
                >
                  {daftarGame.name} ({daftarGame.release})
                </Typography>
                <Typography
                  align="justify"
                  variant="subtitle2"
                  color="textPrimary"
                  component="p"
                >
                  <strong>Genre:</strong> {daftarGame.genre}
                  <br />
                  <strong>SinglePlayer:</strong> {daftarGame.singlePlayer}
                  <br />
                  <strong>Multiplayer:</strong> {daftarGame.multiplayer}
                  <br />
                  <strong>Platform:</strong>
                  {daftarGame.platform}
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

export default GameInfo;
