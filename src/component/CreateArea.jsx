import React, { useState } from "react";
import Firebase, {dbx, authx} from "../firebase/firebase";
import swal from 'sweetalert';
import moment from 'moment';
import { AppString } from "../firebase/const";


class CreateArea extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            content: '',
            user:{}
        };
    }

    componentDidMount()
    {
      this.authListener();

    }

    authListener()
    {
      authx.onAuthStateChanged((user) => {

        if(user)
        {
          this.setState({user})
        } else
        {
          this.setState({user: null})
        }

      })

    }
    
    onSubmit(e) {
        e.preventDefault();
        
        var date = moment().utcOffset('+05:30').format('hh:mm A DD-MM-YYYY');
        
        dbx.collection(AppString.QNA).add(
            {
                title: this.state.user.displayName,
                content: this.state.content,
                time: new Date(),
                time2: date,
                status: '0'
            })
            .then(() => {
                this.setState({content: ''});
                swal("Thank you for submitting your question. Once approved, it will be shared with the expert.");

            });
    }



    render() {
        return (
            <form className="qa-section__input" onSubmit={this.onSubmit.bind(this)}>
                <input
                    className="form-control"
                    name="content"
                    onChange={e => this.setState({content: e.currentTarget.value})}
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
