import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import Main from "../../layout/Main";
import MovieSearch from "./MovieSearch";
import { Helmet } from "react-helmet";

const TITLE = "TABLE MOVIE";

class MovieTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios.get(`https://backendexample.sanbersy.com/api/movies`).then((res) => {
      let data = res.data.map((el) => {
        return {
          id: el.id,
          title: el.title,
          rating: el.rating,
          duration: el.duration,
          genre: el.genre,
          description: el.description,
          year: el.year,
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
        title: "ID FIlm",
        field: "id",
      },
      {
        title: "Judul",
        field: "title",
      },
      {
        title: "Tahun",
        field: "year",
      },
      {
        title: "Rating",
        field: "rating",
      },
      {
        title: "Durasi",
        field: "duration",
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
        <MovieSearch />
        <MaterialTable
          title="Tabel Film"
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
