// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
// import { Link } from "react-router-dom";

class ContextSubmenuLevelTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      activeItemId: null,
      swipeUpClicked: false,
    };
    this.onContextMenusLevel2ItemClick = this.onContextMenusLevel2ItemClick.bind(
      this
    );
  }

  onContextMenusLevel2ItemClick(event, contextMenusLevel2Item) {
    this.setState({ activecontextMenusLevel2Item: contextMenusLevel2Item });
    this.props.onContextMenusLevel2ItemClick(event, contextMenusLevel2Item);
    // const { items, activeItemId } = this.state;
  }

  backIconClicked() {
    const { swipeUpClicked } = this.state;
    this.setState({ swipeUpClicked: !swipeUpClicked });
    this.props.backIconClicked(swipeUpClicked);
  }

  render() {
    return (
      <>
        <div>Hello</div>
      </>
    );
  }
}

export default ContextSubmenuLevelTwo;
