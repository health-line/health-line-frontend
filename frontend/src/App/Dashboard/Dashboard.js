import React, {Component} from "react";
import {Card, CardText} from "material-ui/Card";
import "./Dashboard.css";
import User from "./User/User";
import LifeDiagram from "./LifeDiagram/LifeDiagram";
import MeasurementChoice from "./MeasurementChoice/MeasurementChoice";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: ["STEPS"],
        };
        this.setSelectedKeys = this.setSelectedKeys.bind(this);
    }

    setSelectedKeys(selectedKeys) {
        this.setState({
        	selectedKeys: selectedKeys
        });
    }

    getLifeDiagram() {
    	if (this.state.selectedKeys.length === 0) {
    		return (
    			<div>Please select a key.</div>
			)
		}
		return (
			<LifeDiagram
				userId={this.props.match.params.userId}
				startDate="20160101"
				endDate="20161201"
				selectedKeys={this.state.selectedKeys}/>
		)
	}

    render() {
        return (
			<div className="dashboard container">
				<User userId={this.props.match.params.userId}/>
				<div className="row">
					<div className="mt100 col-xs-12">
						<Card className="h100">
							<CardText>
								{this.getLifeDiagram()}
							</CardText>
						</Card>
					</div>
				</div>
				<div className="row">
					<div className="mt100 col-xs-12">
						<Card className="h100">
							<CardText>
								<MeasurementChoice onSelectedKeysChanged={this.setSelectedKeys}/>
							</CardText>
						</Card>
					</div>
				</div>
			</div>
        );
    }
}

export default Dashboard;
