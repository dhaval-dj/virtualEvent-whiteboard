import React from "react";
import Firebase, {dbx, authx} from "../firebase/firebase";
import QABox from "./QABox";

class QNAL5 extends React.Component {
  
  onHeadingClick(event, item) {
    this.props.onHeadingClick(event, item);
  }

    render() {
    const { item } = this.props;

        return (
          <div className="second-level-nav">
          <h3 className="second-level-nav__title has-icon" > Please post your question here and we will respond with an answer.</h3>
           <QABox/></div>
        )
    }
}

export default QNAL5;
