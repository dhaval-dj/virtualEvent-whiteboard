import React, { useState } from "react";
import Firebase, { dbx, authx, rdbx } from "../firebase/firebase";
import swal from 'sweetalert';
import moment from 'moment';
import { AppString } from "../firebase/const";


class CreateArea extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      content: '',
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();

  }

  authListener() {
    authx.onAuthStateChanged((user) => {

      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }

    })

  }


   GetDate=()=> {
      var d = new Date();
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
        "November", "December"
      ];
      let Today = d.getDate() + "-" + days[d.getDay()] + "-" + months[d.getMonth()] + "-2020";
      return Today;
  }

  onSubmit(e) {
    e.preventDefault();

    var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');

    let userid = this.state.user.uid;
    let audiName = 'KeynoteSession';
    let actionName = "KeynoteSessionAskQuestion"
    let watchList = rdbx.ref('/user_analytics_wd_' + audiName + '/' + userid + '/' + actionName + '/');
    let saveLiveDataToLeaderboardDay = rdbx.ref('/LeaderBoardUserData/' + userid + '/' + this.GetDate() + '/' + audiName + '/');
    let saveLiveDataToLeaderboard = rdbx.ref('/LeaderBoardUserData/' + userid + '/allData/' + actionName + '/');


    dbx.collection(AppString.QNAL1).add(
      {
        title: this.state.user.displayName,
        content: this.state.content,
        time: new Date(),
        time2: date,
        status: '0'
      })
      .then(() => {
  
        watchList.push().set({
          title: this.state.user.displayName,
          content: this.state.content,
          sendTime: date,
          loaction: audiName,
        });

        saveLiveDataToLeaderboardDay.push().set({
          title: this.state.user.displayName,
          content: this.state.content,
          sendTime: date,
          loaction: audiName,
        });

        saveLiveDataToLeaderboard.push().set({
          title: this.state.user.displayName,
          content: this.state.content,
          sendTime: date,
          loaction: audiName,
        });

        this.setState({ content: '' });
        swal("Thank you for submitting your question. Once approved, it will be shared with the expert.");
      });

    //console.log(this.state.user.displayName+' posted a new question!');
  }



  render() {
    return (
      <form className="qa-section__input" onSubmit={this.onSubmit.bind(this)}>
        <input
          className="form-control"
          name="content"
          onChange={e => this.setState({ content: e.currentTarget.value })}
          value={this.state.content}
          required
          placeholder="Enter Your Question"
          autoCorrect="off"
          autoComplete="off"
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
        <button className="form-control__btn">
          <i className="icon-send"></i></button>

      </form>);

  }
}
export default CreateArea;
