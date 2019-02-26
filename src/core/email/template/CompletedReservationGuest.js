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

class CompletedReservationGuest extends React.Component {

  static propTypes = {
    content: PropTypes.shape({
      reservationId: PropTypes.number.isRequired,
      hostName: PropTypes.string.isRequired,
      hostLastName: PropTypes.string.isRequired,
      hostProfilePic: PropTypes.string.isRequired,
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
      paddingBottom: '20px',
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '25px',
      margin: '0',
      padding: '0',
      textAlign: 'center',
      color: '#173839'
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
      fontWeight: 'bold',
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
    const { content: {reservationId} } = this.props;
    const { content: {hostName, hostLastName,  hostProfilePic} } = this.props;
    let messageURL = url + '/review/write/' + reservationId;
    let imageURL;
    if(hostProfilePic) {
      imageURL = url + '/images/avatar/medium_' + hostProfilePic;
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
                    <div>
                      {
                        hostProfilePic && <img style={profilePic} src={imageURL} height={125} />
                      }
                    </div>
                    <EmptySpace height={20} />
                    <h1 style={bookingTitle}>
                      Tell {hostName} {hostLastName} what you loved <br />
                      <span> and what they can do better</span> 
                    </h1>
                    <EmptySpace height={40} />
                    <div>
                      You have just checked out, so now is the perfect time to write your reivew.
                    </div>                    
                    <EmptySpace height={20}/>
                    <div>
                      Reviews are an important part of the {sitename} community. Please take a moment to provide your host with some helpful feedback - 
                      it'll only take few minutes.
                    </div>
                    <EmptySpace height={60} />
                    <div>
                      <a href={messageURL} style={buttonStyle}>Write a Review</a>
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

export default CompletedReservationGuest;