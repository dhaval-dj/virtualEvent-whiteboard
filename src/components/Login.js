import React, { Component } from "react";
import { FirebaseContext } from "../firebase/index";
import { createHashHistory } from "history";
import { isMobileOnly, isTablet, isIPad13 } from 'react-device-detect';

export const history = createHashHistory();

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  alreaylogged: false,
  showWarnningScreen:false,
};

class Login extends Component {
  static contextType = FirebaseContext;

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const tempemail = this.Converemailtolovercase(email);
    const temppassword = this.Converemailtolovercase(password);
    this.context
      .doSignInWithEmailAndPassword(tempemail, temppassword)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        //this.props.history.push(this.referer);
      })
      .catch((err) => {
        this.context.WrongCredentialRegister(email, password,err.code);  
        var error = "";
        console.log(err);
        switch(err.code)
        {
          case "auth/wrong-password":
            error = "Invalid Email/Password";
            break;
          case "auth/user-not-found":
            error = "User Not Found";
            break;
          case "auth/too-many-requests":
            error= "Too many invalid requests, please wait for 60 seconds before retrying";
            break;
          default:
            error = err.message;
            break;
        }
        this.setState({ error });
      });
  }


  Converemailtolovercase(dataa)
  {  
    dataa=dataa.toLowerCase();   
    dataa=dataa.replace(/\s+/g, '');
    return dataa;
  }


  handleChange(e, name) {
    this.handleStateChange([name], e.target.value);
  }

  handleStateChange(name, value) {
    this.setState({ [name]: value });
  }

  componentDidMount() {
    // console.log("componet Did mount");
    this.checkOrientation();
    var self = this;
    window.addEventListener('resize', function(){
        self.checkOrientation();
    });
    window.addEventListener('orientationchange', function(){
        self.checkOrientation();
    });

}

  checkOrientation()
    {
        const width = window.innerWidth;
        const height = window.innerHeight;
        if(width > height)
        {
            this.setState({
              showWarnningScreen: true,
            });
        }else
        {
            this.setState({
              showWarnningScreen: false,
            });
        }
    }

  render() {
    return (
      <>
      
        <section className="loginBox">
          <div className=" default-padding pd-t35 pd-b50">
            {/* <img className="login-logo" src="/assets/images/logo.png" alt="Logo" /> */}
          </div>
          <div className="scrollable-part">
            <form onSubmit={this.login}>
              <div className="form-inputs pd-t35 pd-b30">
                <h2 className="bold-text light-color font-17 mg-b25 login-title">
                VISITOR'S LOGIN
                </h2>
                <div className="form-group">
                  <input
                    id="email"
                    className="form-control"
                    type="text"
                    placeholder="Enter Email ID"
                    onChange={(e) => this.handleChange(e, "email")}
                    value={this.state.email}
                    required
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Password"
                    id="password"
                    onChange={(e) => this.handleChange(e, "password")}
                    value={this.state.password}
                    required
                  />
                  {this.state.error ? (
                    <span className="error">{this.state.error}</span>
                  ) : null}

                  {(this.context.alreadyLoggedIn) && !this.state.error  ? (
                    <span className="error">User is already logged in from another system.</span>
                  ) : null}
                </div>

                <button className="btn mg-t25 login-btn">LOGIN</button>
                
              </div>
            </form>
            <p className="whitep"> <a href="https://storage.googleapis.com/virtual-event-273009.appspot.com/PRAVEN/WDV2Nov/WDPS%20EMEA%20User%20Manual.pdf"  target="_blank"  className="whitep">Platform User Guide </a> </p>
          </div>
        </section>
        <section className="contentCntr">
          <article
            className="videoBox img-bg menu-active"
            style={{
              "backgroundImage": "url('assets/images/canvas-img.jpg')",
            }}
          >
     
          </article>
        </section>


        {isMobileOnly && this.state.showWarnningScreen ?
          (
            <div className="mobile_login_page_warnning">
              <img src="./assets/images/keepPotarate.png"></img>
            </div>
          )
          : (null)
        }
       
      </>
    );
  }
}

export default Login;
