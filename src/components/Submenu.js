// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";

class Submenu extends Component {
  constructor(props) {
    super(props);
    this.state = { items: this.props.items, activeItemId: null, swipeUpClicked: false };
  }

  onSubMenuItemClick(event, contextMenu) {
    this.setState({ activeContextMenuItem: contextMenu });
    this.props.onSubMenuItemClick(event, contextMenu);
  }

  onHeadingClick(event, contextMenu) {
    this.props.onHeadingClick(event, contextMenu);
  }

  onSwipeUpClicked (event, expended) {
    this.props.onSwipeUpClicked(expended);
  }

  render() {
    const { subMenus, activeMenuItem, item } = this.props;

    return (
        <div className={`second-level-nav scrollable-part1 ${item.id === activeMenuItem.id ? "" : "d-none"}`}>
                { item.isContextMenuTitle ? (<h3 className="second-level-nav__title pd-l15" onClick={event => this.onHeadingClick(event, item)}>{item.contextMenuTitle}</h3>) : ""}
                <ul className={`scrollable-part1 ${item.isContextMenuTitle ? "" : "scrollable-part__notitle"}`}>
                {subMenus.map((contextMenu) => (
                    <li className={`${contextMenu.isHighlighted ? "active" : ""}`} 
                    key={contextMenu.id} onClick={(event) => this.onSubMenuItemClick(event, contextMenu)}><a>{contextMenu.name}</a></li>
                ))}
                </ul>
                
            </div>
    );
  }
}

export default Submenu;
