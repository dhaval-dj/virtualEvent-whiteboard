import React, { useState, useEffect } from "react";
import Reply from "./Reply";
import swal from 'sweetalert';
import QABox from "./QABox";
import Firebase, {dbx, authx} from "../firebase/firebase";
import { AppString } from "../firebase/const";

var idx=[];
var loopCount=-1;
dbx.collection(AppString.QNAL2).orderBy('time','desc').where('status', '==', '1')
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            idx.push(doc.id);

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

function useNotes(id)
{
  const [notes, setNotes] = useState([])

  if(loopCount>=(idx.length-1)){
    loopCount=-1;
  }
  useEffect(() => {

    loopCount++;
    dbx.collection(AppString.QNAREPLYL2).orderBy('time','desc').where('replytoid', '==',id).onSnapshot((snapshot) => {
      const newNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setNotes(newNotes)
      // console.log(notes);
    })
  
    return function() {
      /**
       * Add cleanup code here
       */
    };

  },
  [])

  return notes
}

const RBox = (props) =>
{
  const notes = useNotes(props.id)
  return (

    <div>
    {notes.map((note) => {
      return (

        <Reply
          key={note.id}
          id={note.id}
          replyby={note.replyby}
          rcontent={note.rcontent}
          time={(note.time2)}
        />
      );
    })}
    </div>

  );
}

export default RBox;
