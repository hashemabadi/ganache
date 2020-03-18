import connect from "../../../../renderer/screens/helpers/connect";
import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import { Redirect } from "react-router";
import Shell from "./Shell";

class Shells extends Component {
  constructor() {
    super();
  }

  render() {
    const links = [];
    if (this.props.config.settings.workspace.nodes) {
      [...this.props.config.settings.workspace.nodes, ...this.props.config.settings.workspace.notaries].forEach((node => {
        const link = "/corda/shells/" + node.safeName;
        links.push(<NavLink title={node.name} exact activeClassName="corda-tab-selected" key={node.safeName} to={link} className="corda-tab">{node.name}</NavLink>);
      }));
    }
    const context = this.props.match.params.context;
    if(!context){
      const redirectContext = this.props.cordashell[Symbol.for("lastShell")] || this.props.config.settings.workspace.nodes[0].safeName;
      return (
        <Redirect to={"/corda/shells/" + redirectContext } />
      );
    }
    return (
      <div className="Shells">
        {links.length === 0 ? "" : (
          <div className="corda-tabs">
            {links}
          </div>
         )}
        <Shell context={context} />
      </div>
    );
  }
}

export default connect(
  Shells,
  "config",
  "cordashell"
);
