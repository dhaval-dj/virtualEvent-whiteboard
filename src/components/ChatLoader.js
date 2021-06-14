// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";

class ChatLoader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loaderB">
        <img src="assets/images/loader.gif" alt="Loader" width="50" />
      </div>
    );
  }
}

export default ChatLoader;
