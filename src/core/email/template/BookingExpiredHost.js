import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table, TBody, TR, TD} from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import {url, sitename} from '../../../config';

class BookingExpiredHost extends Component {
    static propTypes = {
		content: PropTypes.shape({
			guestName: PropTypes.string.isRequired,
			hostName: PropTypes.string.isRequired,
			listTitle: PropTypes.string.isRequired,
			confirmationCode: PropTypes.number.isRequired,
		}).isRequired
    };

    render() {
    	const textStyle = {
				color: '#4d6364',
				backgroundColor: '#fff',
				fontFamily: 'sans-serif',
				fontSize: '16px',
				padding: '35px',
				textAlign: 'center'
	    };

	    const { content: {hostName, guestName, listTitle, confirmationCode } } = this.props;
        return (
				<Layout>
					<Header color="#173839" backgroundColor="#fff" />
					<div>
						<Table width="100%" >
						<TBody>
							<TR>
								<TD style={textStyle}>
									<EmptySpace height={20} />
									<div>
										Hi {hostName},
									</div>
									<EmptySpace height={20} />
									<div>
										Your reservation ({confirmationCode}) from {guestName} at {listTitle} has expired.
										{' '}{guestName} will be fully refunded.
									</div>
									<EmptySpace height={40} />
									<div>
										Regards, the {sitename} team
									</div>
									<EmptySpace height={80} />
								</TD>
							</TR>
						</TBody>
						</Table>
					</div>
				</Layout>
      );
    }
}

export default BookingExpiredHost;
