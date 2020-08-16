import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import Main from "../../layout/Main";
import GameSearch from "./GameSearch";
import { Helmet } from "react-helmet";

const TITLE = "TABEL GAME";

class MovieTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios.get(`https://backendexample.sanbersy.com/api/games`).then((res) => {
      let data = res.data.map((el) => {
        return {
          id: el.id,
          name: el.name,
          genre: el.genre,
          singlePlayer: el.singlePlayer,
          multiplayer: el.multiplayer,
          release: el.release,
          platform: el.platform,
          image_url: el.image_url,
          updated_at: el.updated_at,
          created_at: el.created_at,
        };
      });
      this.setState({ data });
    });
  }

  render() {
    const columns = [
      {
        title: "ID Game",
        field: "id",
      },
      {
        title: "Judul",
        field: "name",
      },
      {
        title: "Tahun Rilis",
        field: "release",
      },
      {
        title: "Single Player",
        field: "singlePlayer",
      },
      {
        title: "Multi Player",
        field: "multiplayer",
      },
      {
        title: "Platform",
        field: "platform",
      },
      {
        title: "Genre",
        field: "genre",
      },
      {
        title: "Created",
        field: "created_at",
      },
      {
        title: "Last Update",
        field: "updated_at",
      },
    ];

    return (
      <>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
        <Main />
        <GameSearch />
        <MaterialTable
          title="Tabel Game"
          columns={columns}
          data={this.state.data}
          options={{
            filtering: true,
          }}
        />
      </>
    );
  }
}

export default MovieTable;
