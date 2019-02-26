import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import {url, sitename} from '../../../config';

class ConfirmDocumentVerification extends React.Component {

  static propTypes = {
    content: PropTypes.shape({
      verificationStatus: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  };

  render() {
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
    }; 

    const textStyle = {
      color: '#4d6364',
      backgroundColor: '#fff',
      fontFamily: 'sans-serif',
      fontSize: '16px',
      padding: '10px',
      textAlign: 'center'
    };
    const { content: { verificationStatus, name} } = this.props;
    let verificationURL = url + `/user/verification`;

    return (
      <Layout>
        <Header color="#173839" backgroundColor="#fff" />
        <Body textStyle={textStyle}>
          <EmptySpace height={20} />
          <div>
            Hi {name},
          </div>
          <EmptySpace height={20} />
          <div>
            Welcome to {sitename}!
          </div>
          <EmptySpace height={20} />
          <div>
            {
              verificationStatus == 'rejected' && 
              <span>UNFORTUNATELY your documents have been {verificationStatus} in the document verification process.</span>
            }
            {
              verificationStatus != 'rejected' &&
              <span>Your documents have been {verificationStatus} in the document verification process.</span>
            }
          </div>  
          <EmptySpace height={30} />
          <div>
            Thanks, the {sitename} team
          </div>
          <EmptySpace height={60} />
          <div>
            <a style={buttonStyle} href={verificationURL}>Check your profile</a>
          </div>
          <EmptySpace height={80} />
        </Body>
      </Layout>
    );
  }

}

export default ConfirmDocumentVerification;