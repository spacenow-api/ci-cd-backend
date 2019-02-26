import React from 'react';
import PropTypes from 'prop-types';
import {Table, TBody, TD, TR, Img} from 'oy-vey';
import EmptySpace from './EmptySpace';
import {url, sitename} from '../../../config';

const Header = (props) => {
  const style = {
    color: props.color,
    fontWeight: 'bold',
    backgroundColor:'#fff',
    width:'100%'
    
  };

  return (
    <Table
      width="100%"
      style={style}
      color={props.color}>
      <TBody>
        <TR>
          <TD>
            <Table width="100%">
              <TBody>
                <TR>
                  <TD
                    style={{ color: props.color, fontFamily: 'Montserrat, sans-serif', fontSize: '28px', textAlign: 'center'}}>
                    <EmptySpace height={20} />
                    <Img src={url + "/images/logo/spacenow-logo.png"} width={200} alt={sitename} />
                  </TD>
                </TR>
              </TBody>
            </Table>
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};

Header.propTypes = {
  color: PropTypes.string.isRequired
};

export default Header;
