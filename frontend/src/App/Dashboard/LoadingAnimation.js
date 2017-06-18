import React, {Component} from "react";
import {Card, CardText} from "material-ui/Card";

class LoadingAnimation extends Component {


    render() {
        return (
          <Card className="h100">
              <CardText>
                  Loading...
              </CardText>
          </Card>
        );
    }
}
export default LoadingAnimation;
