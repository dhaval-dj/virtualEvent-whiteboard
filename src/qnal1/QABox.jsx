import React, { useState, useEffect } from "react";
import Firebase, {dbx, authx} from "../firebase/firebase";
import Note from "./Note";
import { AppString } from "../firebase/const";
import CreateArea from "./CreateArea";


function useNotes()
{
  const [notes, setNotes] = useState([])
  var idx;
  const [replynotes, setReplyNotes] = useState([])

  useEffect(() => {
    dbx.collection(AppString.QNAL1).orderBy('time','desc').where('status', '==', '1').onSnapshot((snapshot) => {
      const newNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setNotes(newNotes)
    })
  },
  [])

  return notes
}

const QABox = () =>
{
  const replynotes = useNotes()
  return (

    
      <div className="qa-section scrollable-part">
        <div className="qa-section__inner pd-b70 ">
        
     {replynotes.map((note) => {
      return (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          time={(note.time2)}
        />
      );
    })} 
    </div>
    <CreateArea/>
    </div>

  );
}

export default QABox;
