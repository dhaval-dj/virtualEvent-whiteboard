import React from "react";
import Firebase, {dbx, authx} from "../firebase/firebase";


class LoginForm extends React.Component {

constructor(props)
{
   super(props)
   this.login = this.login.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.state={
     email:"",
     password: ""
   }
}

login(e)
{

  e.preventDefault();
  authx.signInWithEmailAndPassword(this.state.email,this.state.password).then((u) => {
  }).catch((err)=>{
  })
}

handleChange(e){
  this.setState({
    [e.target.name] : e.target.value
})
}

    render() {
        return (
          <div>
            <form>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email"
                onChange={this.handleChange}
                value={this.state.email}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              <button onClick={this.login} className="buttons">Login</button>
            </form>

          </div>
        )
    }
}

export default LoginForm;
