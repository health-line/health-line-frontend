import React, { Component } from 'react';
import { connect, PromiseState } from 'react-refetch';
import {Card, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import PersonIcon from 'material-ui/svg-icons/social/person';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import AccessibilityIcon from 'material-ui/svg-icons/action/accessibility';
import WCIcon from 'material-ui/svg-icons/notification/wc';
import settings from '../../../settings';
import './User.css';

class User extends Component {

	getFormattedBirth(birthString) {
		const monthNames = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		const birth = new Date(birthString);
		return birth.getDate() + ". "+ monthNames[birth.getMonth()] + " " + birth.getFullYear();
	}

	getFormattedHeight(height) {
		const heightInMeters = height / 100;
		return heightInMeters + ' Meters'
	}

	render() {
        const { user } = this.props;
        if (user.pending) {
            return <div>Loading...</div>
        } else if (user.rejected) {
			return <span>{user.reason}</span>
        } else if (user.fulfilled) {
        	const userData = user.value;
			const formattedBirth = this.getFormattedBirth(userData["BIRTHDAY"]);
	        const formattedHeight = this.getFormattedHeight(userData["HEIGHT"]);
        	return (
				<div className="col-xs-12 col-sm-6">
					<Card className="h100">
						<CardText>
							<List>
								<ListItem
									primaryText={userData["NAME"]}
									secondaryText="Name"
									leftIcon={<PersonIcon />}/>
								<ListItem
									primaryText={formattedBirth}
									secondaryText="Birthday"
									leftIcon={<FavoriteIcon />}/>
								<ListItem
									className="gender"
									primaryText={<span>{userData["SEX"]}</span>}
									secondaryText="Gender"
									leftIcon={<WCIcon />}/>
								<ListItem
									primaryText={formattedHeight}
									secondaryText="Body Height"
									leftIcon={<AccessibilityIcon />}/>
							</List>
						</CardText>
					</Card>
				</div>
			);
        }
	}
}

export default connect(props => ({
    user: settings.backendUrl + `/user/${props.userId}/`,
}))(User)

