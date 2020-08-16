import React, { Component } from "react";
import { Input, Col, Row, Button } from "antd";
import { Redirect } from "react-router-dom";

export default class MovieSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      redirect: false,
    };
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ redirect: true });
  };

  render() {
    const { redirect, value: id } = this.state;
    return (
      <Row style={{ margin: "10px 10px 20px 50px" }}>
        <Col span={14} offset={5}>
          <form onSubmit={this.handleSubmit}>
            <Input
              className="input"
              type="number"
              placeholder="Masukkan ID Film"
              onChange={this.handleChange}
            />
            <Button
              type="primary"
              icon="search"
              onClick={this.handleSubmit}
            ></Button>
          </form>
        </Col>
        {redirect && id && <Redirect to={`/moviesearch/${id}`} push />}
      </Row>
    );
  }
}
