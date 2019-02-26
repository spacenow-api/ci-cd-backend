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

class NewMessage extends React.Component {

  static propTypes = {
    content: PropTypes.shape({
      receiverName: PropTypes.string.isRequired,
      userType: PropTypes.string.isRequired,
      senderName: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
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

    const btnCenter = {
      textAlign: 'center'
    }

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

  
    const { content: { receiverName, type, senderName, message, threadId } } = this.props;    
    let messageURL = url + '/message/' + threadId + '/guest';
    if (type === "host") {
      messageURL = url + '/message/' + threadId + '/host';
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
                      Hi {receiverName},
                    </div>
                    <EmptySpace height={20} />
                    <div>
                      You have a new message from {senderName}.
                    </div>       
                    <EmptySpace height={20} />
                    <div>
                      <span>_______</span>
                      <EmptySpace height={10} />
                      <strong>Message:</strong>
                    </div>  
                    <EmptySpace height={10} />
                    <div>
                      {message}
                    </div>        
                    <EmptySpace height={40} />
                    <div>
                      Thanks, the {sitename} team
                    </div>  
                    <EmptySpace height={60} />
                    <div style={btnCenter}>
                      <a href={messageURL} style={buttonStyle}>Respond to {senderName}</a>
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

export default NewMessage;