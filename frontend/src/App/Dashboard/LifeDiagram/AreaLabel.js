import React, {Component} from "react";
import "./../Dashboard.css";

class AreaLabel extends Component {


    render() {
        return(
            <a href="https://developer.mozilla.org/en-US/docs/SVG">
                <text fill="black" textAnchor="middle"
                      y="21" x="60">{this.props.label}</text>
            </a>
        )
    }
}


export default AreaLabel;