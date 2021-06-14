import React from "react";
import Firebase, {dbx, authx} from "../firebase/firebase";
import RBox from "./RBox";
import moment from 'moment';
import { AppString } from "../firebase/const";

    var userID;
    var userName;

    authx.onAuthStateChanged((user) => {

      if(user)
      {
        userID = user.uid;
        userName = user.displayName;
      } else
      {
        userID = null;
      }
    })

function Note(props) {



  function ReplyAnswer(e) {

    var target = e.target;
    var parent = target.parentElement;
    var form=parent.querySelector('form');
    var inputBox=parent.querySelector('input');

  e.preventDefault();
  var data = new FormData(e.target);
  var rcontent = data.get("content"); // your input `name` property is `content`

  var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');
  dbx.collection(AppString.QNAREPLYL3).add({
    rcontent,
    replyby: userName,
    replybyid: userID,
    replytoid: props.id,
    time: new Date(),
    time2: date
  }).then(() => {
      inputBox.value="";
  });
}


  return (
    <div className="qa-section__block mg-b15">
      <div className="d-flex align-items-center justify-content-between pd-b10">
      <h3 className="qa-section__title">{props.title}</h3>
      <span className="qa-section__date">{(props.time).toString()}</span>
      </div>
      <h2 className="qa-section__ques pd-b20">{props.content}</h2>
      
      
      <form className="" onSubmit={ReplyAnswer} >
  <input
    className="form-control mg-b20"
    name="content"
    id="myInput"
    required
    placeholder={'Reply to '+props.title}
    autoCorrect="off"
    autoComplete="off"
     />
  {/* <button type="submit" className="replyBtn"> Reply </button> */}
</form>
    <div><RBox id={props.id} /></div>

    </div>

  );
  }

  export default Note;

