import React from 'react';
import { IntlProvider } from 'react-intl';
import fetch from '../fetch/fetch.server';
import { mailChimpConfig as config } from '../../config';

export async function subscribeMailChimp(data) {

    // TODO: Remove
    //console.log('DATA', data);

    const dt = {
        email_address: 'csalucasnascimento@gmail.com',
        status: 'subscribed',
    };

    const API_LIST_ID = config.listId;
    const API_KEY = `${Buffer.from(`apikey:${config.apiKey}`).toString('base64')}`;

    const resp = await fetch(`https://us14.api.mailchimp.com/3.0/lists/${API_LIST_ID}/members`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            Authorization: `Basic ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        json: true,
        body: dt,
        credentials: 'included'
    });
    const { status, response } = await resp.json();
    return { status, response };
} 
