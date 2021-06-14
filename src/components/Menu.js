// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jump from 'react-reveal/Jump'; 
import Swing from 'react-reveal/Swing';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { items: this.props.items, activeItemId: this.props.mainMenuState};
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.canInteract= this.props.canInteract;
    
  }

  componentWillReceiveProps(newProps) {
    if(newProps.canInteract !== undefined)
    {
      this.canInteract = newProps.canInteract;
    }

    if(newProps.mainMenuState !== undefined)
    {
      this.setState({
        activeItemId: newProps.mainMenuState
      });
    }
  }

  onMenuItemClick(event, item) {
    
    if(!this.canInteract)
    {
      return;
    }
    this.setState({ activeItemId: item.id });
    this.props.onMenuItemClick(event, item);
    // const { items, activeItemId } = this.state;
  }

  checkValue()
  {
    // console.log(this.state.activeItemId);
  }

  render() {
    const { items } = this.props;
    const { items2 } = this.props;    
    return (
      <ul className="bottom-icons-nav bottom-icons-nav--withtext">
        <li className="show-on-desktop desktop__logo centerZ pd-t15">
          <img className="menu-bar-logo" src="assets/images/logo_icon.png" alt="" height="22"  />
        </li>
    {this.checkValue()}
        {items.map((item) => (
          <li key={item.id} onClick={(event)=>this.onMenuItemClick(event,item)} >
            {/* { item.id != 'call' &&
              <a className={item.id == this.state.activeItemId && item.enabled ? "active" : ""}>
                <i className={item.id == this.state.activeItemId && item.enabled ? item.class+"-active" : item.class}></i>
                <span className="mg-t5">{item.name}</span>
              </a>
            } */}
   
            { item.id != 'uihider' 
            ? <a className={item.id == this.state.activeItemId && item.enabled ? "active" : ""}>
                <i className={item.id == this.state.activeItemId && item.enabled ? item.class+"-active" : item.class}></i>
                <span className="mg-t5">{item.name}</span>
              </a>
            : item.id == 'uihider' &&
              <a className={item.id == this.state.activeItemId && item.enabled ? "active" : ""}>
                <i className={this.props.itemstauts.sidebar ? item.class+"-active" : item.class}></i>
                <span className="mg-t5">{this.props.itemstauts.sidebar ?'Show':'Hide'}</span>
              </a>
            }

            {/* {item.id == 'call' ?(<>
              <a className={item.enabled ? "has-notification active" : ""}>
              <i className={item.class}></i>
              <span className="mg-t5">{item.name}</span>
              </a>
            </>):(null) } */}

          { item.id == 'call' && !item.enabled ? ( <Swing>
              <a className={item.enabled ? "has-notification active" : ""}>
              <i className={item.enabled ? item.class+"-active" : item.class}></i>
              <span className="mg-t5">{item.name}</span>
              </a>
            </Swing>) :(null)
            }

            {item.id == 'call' && item.enabled ?(<>
              <Swing forever>
              <a className={item.enabled ? "has-notification active" : ""}>
              <i className={item.class}></i>
              <span className="mg-t5">{item.name}</span>
              </a>
            </Swing>
            </>):(null) }
          </li>
        ))}
      </ul>
    );
  }
}

export default Menu;