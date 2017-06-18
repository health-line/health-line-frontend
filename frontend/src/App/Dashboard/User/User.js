import React, { Component } from 'react';
import { connect, PromiseState } from 'react-refetch';
import {Card, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import PersonIcon from 'material-ui/svg-icons/social/person';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import AccessibilityIcon from 'material-ui/svg-icons/action/accessibility';
import WCIcon from 'material-ui/svg-icons/notification/wc';
import settings from '../../../settings';
import './../Dashboard.css';

class User extends Component {

	render() {
        const { user } = this.props;

        if (user.pending) {
            return <div>Loading...</div>
        } else if (user.rejected) {
			return <span>{user.reason}</span>
        } else if (user.fulfilled) {
        	const userData = user.value;
        	return (
				<div className="col-xs-12 col-sm-6">
					<Card className="h100">
						<CardText>
							<List>
								<ListItem primaryText={userData["NAME"]} leftIcon={<PersonIcon />}/>
								<ListItem primaryText={userData["BIRTHDAY"]} leftIcon={<FavoriteIcon />}/>
								<ListItem primaryText={userData["SEX"]} leftIcon={<WCIcon />}/>
								<ListItem primaryText={userData["HEIGHT"]} leftIcon={<AccessibilityIcon />}/>
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

