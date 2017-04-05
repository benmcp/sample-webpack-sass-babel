import React, { Component, PropTypes } from 'react';
import Helmet from "react-helmet";

class Head extends Component {
  render() {
    this.title = 'ben mcphail';
    return (
      <Helmet
        htmlAttributes={{"lang": "en", "amp": undefined}} // amp takes no value
        title={this.title}
        titleTemplate={this.title}
        defaultTitle={this.title}
        meta={[
            {"charset": "utf-8"},
            {"name": "description",  "content": `${this.title}'s personal website` },
            {"name": "viewport", "content": "width=device-width, initial-scale=1"},
            {"property": "og:title",  "content": this.title },
            {"property": "og:description",  "content": `${this.title}'s personal website` },
            {"property": "og:site_name",  "content": this.title },
            {"property": "og:url",  "content": window.location.href },
            {"property": "og:type",  "content": "website" },
        ]}
        link={[
            {"rel": "stylesheet", "href": "https://fonts.googleapis.com/css?family=Roboto:thin,light"}
        ]}
      />
    )
  }
}

export default Head;
