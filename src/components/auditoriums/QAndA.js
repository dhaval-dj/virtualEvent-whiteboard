import React, { Component } from "react";
import { FirebaseContext } from "../../firebase";
import { AppString } from "../../firebase/const";

class QAndA extends Component {
  static contextType = FirebaseContext;

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
       
  }

  componentDidMount() {
      console.log(" QNA componet Did mount");
  }

  componentWillUnmount() {
      console.log("componet Did unmount");
  }

  componentWillReceiveProps(newProps) {
      console.log("newPrpos recevived");
      
  }

  onHeadingClick(event, item) {
    this.props.onHeadingClick(event, item);
  }

  render() {
    const { item } = this.props;
    return (
      <>
        <div className="second-level-nav">
          <h3 className="second-level-nav__title has-icon" onClick={event => this.onHeadingClick(event, item)}>
            <i className="second-level-nav__icon icon-angle-back"></i> Q&amp;A
          </h3>
          <div className="qa-section scrollable-part">
            <div className="qa-section__inner pd-b70">
              <div className="qa-section__block mg-b15">
                <div className="d-flex align-items-center justify-content-between pd-b10">
                  <h3 className="qa-section__title">JAMSHAID</h3>
                  <span className="qa-section__date">02:24 PM 06-05-2020</span>
                </div>
                <h2 className="qa-section__ques pd-b20">
                  What are the best practices for conducting a virtual event?
                </h2>
                <div className="form-group mg-b15">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reply to Jamshaid"
                  />
                </div>
                <div className="qa-section__reply mg-b15">
                  <h3 className="qa-section__title pd-b15">Rana</h3>
                  <h2 className="qa-section__ques">
                    What are the best practices for conducting a virtual event?
                  </h2>
                </div>
              </div>
              <div className="qa-section__block mg-b15">
                <div className="d-flex align-items-center justify-content-between pd-b10">
                  <h3 className="qa-section__title">JAMSHAID</h3>
                  <span className="qa-section__date">02:24 PM 06-05-2020</span>
                </div>
                <h2 className="qa-section__ques pd-b20">
                  What are the best practices for conducting a virtual event?
                </h2>
                <div className="form-group mg-b15">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reply to Jamshaid"
                  />
                </div>
                <div className="qa-section__reply mg-b15">
                  <h3 className="qa-section__title pd-b15">Rana</h3>
                  <h2 className="qa-section__ques">
                    What are the best practices for conducting a virtual event?
                  </h2>
                </div>
              </div>
              <div className="qa-section__block mg-b15">
                <div className="d-flex align-items-center justify-content-between pd-b10">
                  <h3 className="qa-section__title">JAMSHAID</h3>
                  <span className="qa-section__date">02:24 PM 06-05-2020</span>
                </div>
                <h2 className="qa-section__ques pd-b20">
                  What are the best practices for conducting a virtual event?
                </h2>
                <div className="form-group mg-b15">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reply to Jamshaid"
                  />
                </div>
                <div className="qa-section__reply mg-b15">
                  <h3 className="qa-section__title pd-b15">Rana</h3>
                  <h2 className="qa-section__ques">
                    What are the best practices for conducting a virtual event?
                  </h2>
                </div>
              </div>
              <div className="qa-section__block mg-b15">
                <div className="d-flex align-items-center justify-content-between pd-b10">
                  <h3 className="qa-section__title">JAMSHAID</h3>
                  <span className="qa-section__date">02:24 PM 06-05-2020</span>
                </div>
                <h2 className="qa-section__ques pd-b20">
                  What are the best practices for conducting a virtual event?
                </h2>
                <div className="form-group mg-b15">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reply to Jamshaid"
                  />
                </div>
                <div className="qa-section__reply mg-b15">
                  <h3 className="qa-section__title pd-b15">Rana</h3>
                  <h2 className="qa-section__ques">
                    What are the best practices for conducting a virtual event?
                  </h2>
                </div>
              </div>
              <div className="qa-section__block mg-b15">
                <div className="d-flex align-items-center justify-content-between pd-b10">
                  <h3 className="qa-section__title">JAMSHAID</h3>
                  <span className="qa-section__date">02:24 PM 06-05-2020</span>
                </div>
                <h2 className="qa-section__ques pd-b20">
                  What are the best practices for conducting a virtual event?
                </h2>
                <div className="form-group mg-b15">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reply to Jamshaid"
                  />
                </div>
                <div className="qa-section__reply mg-b15">
                  <h3 className="qa-section__title pd-b15">Rana</h3>
                  <h2 className="qa-section__ques">
                    What are the best practices for conducting a virtual event?
                  </h2>
                </div>
              </div>
              <div className="qa-section__block mg-b15">
                <div className="d-flex align-items-center justify-content-between pd-b10">
                  <h3 className="qa-section__title">JAMSHAID</h3>
                  <span className="qa-section__date">02:24 PM 06-05-2020</span>
                </div>
                <h2 className="qa-section__ques pd-b20">
                  What are the best practices for conducting a virtual event?
                </h2>
                <div className="form-group mg-b15">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reply to Jamshaid"
                  />
                </div>
                <div className="qa-section__reply mg-b15">
                  <h3 className="qa-section__title pd-b15">Rana</h3>
                  <h2 className="qa-section__ques">
                    What are the best practices for conducting a virtual event?
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="qa-section__input">
            <input
              type="text"
              className="form-control"
              placeholder="Ask a question"
            />
            <button className="form-control__btn" disabled>
              <i className="icon-send"></i>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default QAndA;
