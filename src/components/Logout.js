import React from "react";

import { withFirebase } from "../firebase";

const Logout = ({ firebase }) => (
  <button className="second-level-nav__title-btn" onClick={firebase.doSignOut}>
    Log out
  </button>
);

export default withFirebase(Logout);
