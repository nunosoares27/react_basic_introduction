import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteData: null,
      quotes: []
    };
    this.fetchQuote = this.fetchQuote.bind(this);
  }
  componentDidMount() {
    axios
      .get(
        "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=30"
      )
      .then(response => {
        console.log(response.data[0]);
        this.setState({
          quotes: response.data,
          quoteData: response.data[0]
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fetchQuote(e) {
    e.preventDefault();
    var randomNumber = Math.floor(Math.random() * 30);
    this.setState({
      quoteData: this.state.quotes[randomNumber]
    });
  }
  render() {
    return (
      <div className="main">
        <div className="center-content">
          {this.state.quoteData !== null ? (
            <div>
              {" "}
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.quoteData.content
                }}
              />
              <h2
                dangerouslySetInnerHTML={{ __html: this.state.quoteData.title }}
              />
            </div>
          ) : (
            "Loading"
          )}
        </div>
        <button onClick={this.fetchQuote}>Get new quote!!!</button>
      </div>
    );
  }
}

export default App;
