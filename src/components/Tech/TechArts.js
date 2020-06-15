import React, { Component, Fragment } from "react";
import Tech from "./Tech";
import axios from "axios";

class TechArts extends Component {
  state = {
    news: [],
    pageSize: 25,
    loading: true,
    category: "technology"
  };

  componentDidMount() {
    const { pageSize, category } = this.state;
    axios
        .get(
            `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
            console.log(res.data.articles);
            this.setState({
                news: res.data.articles,
                loading: false,
            });
        })
        .catch((err) => console.log(err));
  }

  render() {
    const { loading, news } = this.state;
    return (
      <Fragment>
        <div className="row">
          <h2 className="sub-heading top-lead">Technology</h2>
        </div>
        <div className="card-columns">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            news.map((article, index) => {
              return (
                <Tech
                  key={index}
                  title={article.title}
                  link={article.url}
                  img={article.urlToImage}
                  desc={article.description}
                  source={article.source.name}
                />
              );
            })
          )}
        </div>
      </Fragment>
    );
  }
}

export default TechArts;
