import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Table, TBody, TR, TD} from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import {url, sitename} from '../../../config';

class BookingConfirmationHost extends React.Component {


  static propTypes = {
    content: PropTypes.shape({
      reservationId: PropTypes.number.isRequired,
      threadId: PropTypes.number.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      guestName: PropTypes.string.isRequired,
      guestLastName: PropTypes.string.isRequired,
      guestLocation: PropTypes.string.isRequired,
      guestProfilePic: PropTypes.string.isRequired,
      guestJoinedDate: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      guests: PropTypes.number.isRequired,
      allowedCheckInTime: PropTypes.string.isRequired,
      allowedCheckOutTime: PropTypes.string.isRequired,
    }).isRequired
  };

  render() {
    
     const textStyle = {
      color: '#173839',
      backgroundColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: '16px',
      padding: '10px',
      textAlign: 'center'
    };

    const buttonStyle = {
      margin: 0,
      fontFamily: 'sans-serif',
      padding: '12px 30px',
      textDecoration: 'none',
      borderRadius: '40px',
      border: '1px solid',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
      fontSize: '18px',
      whiteSpace: 'nowrap',
      background: '#ffffff',
      borderColor: '#6cde93',
      backgroundColor: '#6cde93',
      color: '#ffffff',
      borderTopWidth: '1px',
      textTransform: 'uppercase'
    }

    const bookingTitle = {
      paddingBottom: '25px',
      fontWeight: 'bold',
      fontSize: '40px',
      lineHeight: '48px',
      margin: '0',
      padding: '0',
      textAlign: 'center'

    }

    const profilePic = {
      borderRadius: '999px',
      margin: '0',
      padding: '0',
      lineHeight: '150%',
      borderSpacing: '0',
      width: '125px'
    }

    const userName = {
      color: '#173839',
      fontSize: '26px',
      fontWeight: 'bold',
      paddingBottom: '5px',
    }

    const subTitle = {
      color: '#4d6364',
      fontSize: '18px',
      paddingBottom: '5px',
    }

    const linkText = {
      color: '#6cde93',
      fontSize: '18px',
      textDecoration: 'none',
      cursor:'pointer',
    }

    const space={
      paddingBottom:'20px',
    }

    const greyText = {
      color: '#4d6364',
    }
    const { content: {reservationId, threadId} } = this.props;
    const { content: {guestName, guestLastName, guestLocation, guestProfilePic, guestJoinedDate} } = this.props;
    const { content: {checkIn, checkOut, guests, allowedCheckInTime, allowedCheckOutTime, confirmationCode} } = this.props;
    let checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM, YYYY') : '';
    let checkOutDate = checkOut != null ? moment(checkOut).format('ddd, Do MMM, YYYY') : '';
    let checkInDateShort = checkIn != null ? moment(checkIn).format('Do MMM') : '';
    let guestJoinedYear = guestJoinedDate != null ? moment(guestJoinedDate).format('YYYY') : '';
    let itineraryURL = url + '/users/trips/itinerary/' + reservationId;
    let messageURL = url + '/message/' + threadId + '/host';
    let imageURL;
    if(guestProfilePic) {
      imageURL = url + '/images/avatar/medium_' + guestProfilePic;
    }
    
    return (
      <Layout>
        <Header color="#173839" backgroundColor="#fff" />
          <div>
            <Table width="100%" >
              <TBody>
                <TR>
                  <TD style={textStyle}>
                    <EmptySpace height={20} />
                    <h1 style={bookingTitle}>
                      New booking confirmed! <br />
                    </h1>
                    <EmptySpace height={20} />
                    <div>
                      <span style={greyText}><strong>{guestName} arrives {checkInDateShort}</strong></span><br/>
                      <EmptySpace height={10} />
                      <span style={greyText}>Send a message to confirm check-in details or welcome {guestName}.</span>
                    </div>
                    <EmptySpace height={40} />
                    <div>
                      {
                        guestProfilePic && <img style={profilePic} src={imageURL} height={125} />
                      }
                    </div>
                    <EmptySpace height={20} />
                    <div>
                      <span style={userName}>{guestName} {guestLastName}</span><br />
                      <EmptySpace height={10} />
                      <span style={greyText}>{guestLocation}</span><br />
                      <EmptySpace height={5} />
                      <span style={greyText}>{sitename} member since {guestJoinedYear}</span>
                    </div>
                    <EmptySpace height={40} />
                  </TD>
                </TR>
              </TBody>
            </Table>
            <Table width="100%">
              <TBody>
                <TR style={textStyle}>
                  <TD style={space}>
                    <span style={subTitle}><strong>Check In:</strong> {checkInDate}, {allowedCheckInTime}</span>
                  </TD>
                </TR>
                <TR style={textStyle}>
                  <TD style={space}>
                    <span style={subTitle}><strong>Check Out:</strong> {checkOutDate}, {allowedCheckOutTime}</span>
                  </TD>
                </TR>

                <TR style={textStyle}>
                  <TD>
                    <div>
                      <span style={subTitle}><strong>Guests:</strong> {guests}</span>
                    </div>
                  </TD>
                </TR>
                
                <TR style={textStyle}>
                  <TD>
                    <div>
                      <EmptySpace height={20} />
                      <span>_____</span><br/>
                      <EmptySpace height={10} />
                      <span style={subTitle}><strong>Confirmation Code:</strong> {confirmationCode}</span>
                    </div>
                  </TD>
                </TR>

                <TR style={textStyle}>
                  <TD>
                    <div>
                      <EmptySpace height={15} />
                      <a href={itineraryURL} style={linkText}> <strong>View Itenary</strong></a>
                    </div>
                  </TD>
                </TR>

                <TR style={textStyle}>
                  <TD>
                    <EmptySpace height={60} />
                      <div>
                        <a href={messageURL} style={buttonStyle}><strong>Contact Guest</strong></a>
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

export default BookingConfirmationHost;