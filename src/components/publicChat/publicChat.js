import React, { Component } from "react";
import { FirebaseContext } from "../../firebase";


class PublicChat extends Component {
    static contextType = FirebaseContext;

    constructor(props) {
        super(props);
        
    };


    componentDidMount() {
        
        var self = this;
        var elem = document.getElementById("firechat-wrapper");
        
        var chatRef = this.context.database.ref();
        // eslint-disable-next-line no-undef
        this.chat = new FirechatUI(chatRef, elem);

        console.log(this.chat);

        this.context.auth.onAuthStateChanged(function(user) {
        if (user) {
            self.chat.setUser(user.uid, user.displayName);
            } 
        });
    }


    render() {
        return (
            <>
            <div className="scrollable-part" id="firechat-wrapper"></div>
            </>
        );
    }
}

export default PublicChat;