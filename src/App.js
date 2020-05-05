import React, { Component } from "react";
import axios from "axios";
// Styles
import "./App.css";

class App extends Component {
  state = { dogImage: "" };

  componentDidMount() {
    this.fetchDogImage();
  }

  fetchDogImage = () => {
    axios
      .get("https://random.dog/woof.json")
      .then((response) => {
        const { url } = response.data;
        console.log(typeof url);
        console.log(url);
        // skips anything with video
        if (url.includes("mp4") || url.includes("webm")) {
          console.log("contains video");
          this.fetchDogImage();
        } else {
          this.setState({ dogImageUrl: url });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { dogImageUrl } = this.state;

    return (
      <div className="app">
        <div className="image-container">
          <img className="dog-image" src={dogImageUrl} alt=""></img>
        </div>
        <div className="button-container">
          <button className="dog-btn" onClick={this.fetchDogImage}>
            Show Me Doggo{" "}
            <span aria-label="dog emoji" role="img">
              🐶
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
