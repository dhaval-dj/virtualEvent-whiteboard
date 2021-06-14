import React from "react";
import swal from 'sweetalert';
import Firebase, {dbx, authx} from "../firebase/firebase";


function Reply(props) {

  return (

    <div className="qa-section__reply mg-b15"><h3 className="qa-section__title pd-b15">{props.replyby}</h3><h2 className="qa-section__ques">{props.rcontent}</h2><span className="time"> {(props.time).toString()}</span></div>
  );
  }

  export default Reply;
