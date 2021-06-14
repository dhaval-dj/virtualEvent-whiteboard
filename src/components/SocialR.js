import React, { Component } from 'react';
import { FirebaseContext } from "../firebase";
import Firebase, { dbx, authx, storage } from "../firebase/firebase";
import {
  FacebookShareCount,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon
} from "react-share";

class SocialR extends Component {

    static contextType = FirebaseContext;

    constructor(props) {
        super(props);
    
        this.state = {
          score: 0,
          user: {},
          isShare: false
          
        }
        //this.updateProfile = this.updateProfile.bind(this);
        //this.openAgenda = this.openAgenda.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        this.getShare = this.getShare.bind(this);
      }


    componentDidMount() {
        console.log("ShareR")
        this.authLis = this.context.auth.onAuthStateChanged((user) => {
          //image = user.photoURL;
          if (user) {
            this.setState({ user })
            this.getShare();

          } else {
            this.setState({ user: null })
          }
        });
    }

    componentWillUnmount() {
        this.authLis();
        //this.getShare();
    }



        getShare = async () => {
        await this.context.db.collection("InfinityRunner").doc(this.state.user.uid).onSnapshot(function(doc) {
            
                this.score = doc.data().score;
                this.setState({ score: doc.data().score});
                console.log("Current data: ", this.state.score);
            }.bind(this));
        }

        // getShare()
        // {
        //     this.context.db.collection("InfinityRunner").doc(this.state.user.uid).onSnapshot(function(doc) {
            
        //         //const data = doc.data();
                
        //         this.score = doc.data().score;
        //         this.setState({ score: doc.data().score});
        //         console.log("Current data: ", this.state.score);
        //     }.bind(this));
        // }



    render() {
        const shareUrl = 'http://seller.flipkart.com/';
        //const shareUrl = 'http://github.com';
        const title = 'Attending Flipkart Business Hours and getting ready to pick up the pace! #AaoPhirPakdeRaftaar @FlipkartSellerHub - My Runner Game Score: '+ this.state.score+ ' Points';
    
        return (
          <div className="centerRR">
            <div className="Demo__some-network">
              <FacebookShareButton
                url={shareUrl}
                quote={title}
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={42} round />
              </FacebookShareButton>
    
            </div>
    
            <div className="Demo__some-network">
              <TwitterShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TwitterIcon size={42} round />
              </TwitterShareButton>
    
              <div className="Demo__some-network__share-count">&nbsp;</div>
            </div>
    
            
    
            <div className="Demo__some-network">
              <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={42} round />
              </WhatsappShareButton>
    
              <div className="Demo__some-network__share-count">&nbsp;</div>
            </div>
    
            
    
          </div>
        );
      }
    }

export default SocialR;