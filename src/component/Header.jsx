import React from "react";
import Firebase, {dbx, authx} from "../firebase/firebase";


class Header extends React.Component {

  constructor(props)
  {
     super(props)
     this.state={
       user:{}
     }
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

  logout()
  {
    this.context.auth.signOut();
  }

    render() {
        return (
          <header>
          <div>
          <h1>{this.state.user ? <button onClick={this.logout} className="logoutButtons">Logout</button> : null}</h1>
          </div>
          </header>
        )
    }
}

export default Header;
