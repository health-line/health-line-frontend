import React, {Component} from "react";
import {Card, CardText} from "material-ui/Card";
import "./Dashboard.css";
import User from "./User/User";
import EventTable from "./EventTable/EventTable";
import LifeDiagram from "./LifeDiagram/LifeDiagram";
import MeasurementChoice from "./MeasurementChoice/MeasurementChoice";
import settings from '../../settings';
import { connect, PromiseState } from 'react-refetch';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: ["STEPS"],
            displayDetails: false,
            displayedEvent: 0
        };
        this.setSelectedEvent = this.setSelectedEvent.bind(this);
        this.setSelectedKeys = this.setSelectedKeys.bind(this);
    }

    setSelectedEvent(index) {
    	if (index === -1) {
            this.setState({
                displayDetails: false,
            });
            return;
		}
        this.setState({
            displayDetails: true,
            displayedEvent: index
        });
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
        let startDate="20160101";
        let endDate="20161201";
        if (this.props.match.params.userId === 3) {
        	startDate="20090101";
        	endDate="20161230";
		}
        if (this.props.match.params.userId === 4) {
            startDate="20130101";
            endDate="20400101";
        }
        if (this.state.displayDetails) {
            const currentEvent = this.props.events.value[this.state.displayedEvent];
            startDate = new Date(currentEvent["DATE_START"]).toISOString().split("T")[0];
            endDate = new Date(currentEvent["DATE_END"]).toISOString().split("T")[0];
		}

		return (
			<LifeDiagram
				userId={this.props.match.params.userId}
				startDate={startDate}
				endDate={endDate}
				selectedKeys={this.state.selectedKeys}/>
		)
	}

    render() {
        const { events } = this.props;

        if (events.pending) {
            return <div>Loading...</div>
        } else if (events.rejected) {
            return <span>{events.reason}</span>
        } else if (events.fulfilled) {
        	return(
				<div className="dashboard container">
					<div className="row">
						<User userId={this.props.match.params.userId}/>
						<EventTable onEventsChange={this.setSelectedEvent} events={events.value} displayDetails={this.state.displayDetails} selectedIndex={this.state.displayedEvent}/>
					</div>

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
}
export default connect(props => ({
    events: settings.backendUrl + `/user/${props.match.params.userId}/events/`,
}))(Dashboard)
