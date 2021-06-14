// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";

const loadingStyle = {
  padding: "0rem 1.75rem",
  color: "white",
  marginTop: "2rem",
  lineHeight: "1.5rem",
  textAlign: "center"
};

const highlightStyle = {
  color: "white"
};

class ContextSubmenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItemId: -1, swipeUpClicked: false, loading: this.props.inTransition };
    this.canInteract= this.props.canInteract;
  }

  componentDidMount()
  {
    this.props.resetExternalActiveItemId();
  }

  componentWillReceiveProps(newProps) {
    this.canInteract = newProps.canInteract;
    
    if (newProps.inTransition !== undefined)// check if new props update have intransition or not
    {
      this.setState({
        loading: newProps.inTransition
      });
    }
    if(newProps.externalActiveItemId !== undefined)
    {
      console.log(newProps.externalActiveItemId);
      this.setState({
        activeItemId: newProps.externalActiveItemId
      })
    }
  }

  onMenuItemClick(event, menuItem) {
    if(!this.canInteract)
    {
      return;
    }
    this.setState({ activeItemId: menuItem.id });
    this.props.onMenuItemClick(event, menuItem);
  }

  onHeadingClick(event, parentMenuItem) {
    if(!this.canInteract)
    {
      return;
    }
    if(this.state.loading)
    {
      return;
    }
    console.log(parentMenuItem);
    this.props.onHeadingClick(event, parentMenuItem);
  }

  backIconClicked () {
    if(!this.canInteract)
    {
      return;
    }
    const { swipeUpClicked } = this.state;
    this.setState({ swipeUpClicked: !swipeUpClicked });
    this.props.backIconClicked(swipeUpClicked);
  }

  render() {
    const { menuItems, parentMenuItem } = this.props;

    return (
      <div className={`second-level-nav`}>
          
          <h3 className={`second-level-nav__title ${parentMenuItem.level === 0 ? "" : "has-icon"}`} onClick={event => this.onHeadingClick(event, parentMenuItem)}>
            {(this.state.loading)?(null):(<i className={`second-level-nav__icon icon-angle-back ${parentMenuItem.level === 0 ? "d-none" : ""}`}></i>)}{parentMenuItem.name}</h3>
            {(this.state.loading) ?
          (<div className="tutorial-section" style={loadingStyle}>
            Loading....
          </div>)
          : ( <ul className={`scrollable-part`}>
          {menuItems.map((menuItem) => (
              <li key={menuItem.id}
              onClick={(event) => this.onMenuItemClick(event, menuItem)} >
                <a style={(this.state.activeItemId === menuItem.id)?(highlightStyle):(null)} >{menuItem.name}</a>
              </li>
          ))}
          </ul>)}
      </div>
    );
  }
}

export default ContextSubmenu;
