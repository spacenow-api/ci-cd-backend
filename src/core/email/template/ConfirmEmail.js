import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import {url, sitename} from '../../../config';

class ConfirmEmail extends React.Component {

  static propTypes = {
    content: PropTypes.shape({
      token: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
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
    const { content: {token, email, name} } = this.props;
    let verificationURL = url + `/user/verification?confirm=${token}&email=${email}`;

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
            Welcome to {sitename}! In order to get started, you need to confirm your email address.
          </div>
          <EmptySpace height={30} />
          <div>
            Thanks, the {sitename} team
          </div>
          <EmptySpace height={60} />
          <div>
            <a style={buttonStyle} href={verificationURL}>Confirm your email</a>
          </div>
          <EmptySpace height={80} />
        </Body>
      </Layout>
    );
  }

}

export default ConfirmEmail;