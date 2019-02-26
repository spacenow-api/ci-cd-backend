import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table, TBody, TR, TD} from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import {url, sitename} from '../../../config';

class BookingConfirmationGuest extends Component {
    static propTypes = {
		content: PropTypes.shape({
			hostName: PropTypes.string.isRequired,
			guestName: PropTypes.string.isRequired,
			listTitle: PropTypes.string.isRequired,
			listCity: PropTypes.string.isRequired,
			threadId: PropTypes.number.isRequired,
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
			
			const linkText = {
	      color: '#6cde93',
	      fontSize: '16px',
	      textDecoration: 'none',
	      cursor:'pointer',
	    }


	    const { content: {guestName, hostName, listTitle, listCity, threadId} } = this.props;
	    let contactURL = url + '/message/' + threadId + '/guest';

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
					          Hi {guestName},
					        </div>
									<EmptySpace height={20} />
					        <div>
					          Get ready - you are going to {listCity}
					        </div>
					        <EmptySpace height={20} />
					        <div>
					          {hostName} has confirmed your request at {listTitle}. Please review details of your booking and 
					          {' '}<a style={linkText} href={contactURL}>contact host</a>{' '} to coordinate check-in time and key exchange.
					        </div>
					        <EmptySpace height={20} />
					        <div>
					            Thanks, the {sitename} team
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

export default BookingConfirmationGuest;
