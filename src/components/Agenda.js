import React, { Component } from 'react';
import { FirebaseContext } from "../firebase";

class Agenda extends Component {
    static contextType = FirebaseContext;

    constructor(props) {
        super(props);
    
        this.state = {
            user:{},
            roomId:"",
            roomName:"",
            startTime:"",
            endTime:"",
            userId:""
        }
        //this.updateProfile = this.updateProfile.bind(this);
    }

    componentDidMount()
    {
          console.log("Profile")
          this.authLis =  this.context.auth.onAuthStateChanged((user) => {
            //image = user.photoURL;
            if(user)
            {
              this.setState({user})
              this.getCallData();
            } else
            {
              this.setState({user: null})
            }
          });  
    }

componentWillUnmount()
  {
    this.authLis();
  }


  getCallData = async () =>
    {
        const callDoc = await this.context.db.collection("flipkartcallroom").doc(this.state.user.email).get();
        if(callDoc.data()){
          
          const data = callDoc.data();

          this.setState({
            roomId: data.roomId,
            roomName: data.roomName,
            startTime: data.startDateTime,
            endTime: data.endDateTime,
            userId: data.userId
          });
        }
    }


  render() {


    return (
    <div className="profile-details1">
        <div className="profile-details__block mg-t10">
        <h3 className="qa-section__title pd-b15 p-bottom fkcolor">Your Meeting Schedule Information</h3>
        <hr></hr>
        <h2 className="qa-section__ques pd-b5 pd-t15 p-top"><span className="fkcolor">UserID: </span>{this.state.userId}</h2>
        <h2 className="qa-section__ques pd-b5 p-top"><span className="fkcolor">Room Name: </span>{this.state.roomName}</h2>
        <h2 className="qa-section__ques pd-b5 p-top"><span className="fkcolor">Start Time: </span>{this.state.startTime}</h2>
        <h2 className="qa-section__ques pd-b5 p-top"><span className="fkcolor">End Time: </span>{this.state.endTime}</h2>
        {/* <input className="profile-details1 buttons" type="button" value="Join Call" disabled="true"></input> */}
        
        </div> 
    </div>
    );
  }
}

export default Agenda;