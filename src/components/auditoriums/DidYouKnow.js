import React, { Component } from "react";
import { FirebaseContext } from "../../firebase";

class DidYouKnow extends Component {
  static contextType = FirebaseContext;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="second-level-nav">
          <h3 className="second-level-nav__title has-icon">
            <i className="second-level-nav__icon icon-angle-back"></i> Did You Know
          </h3>
        </div>
      </>
    );
  }
}

export default DidYouKnow;
