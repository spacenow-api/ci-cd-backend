import fetch from '../fetch';

export async function sendPayment(reservationId, amount, currency, description) {
        
        /*let amount= 10;
        let currency = 'USD';
        let description = 'Just testing';*/

        const resp = await fetch('/paynow', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({reservationId, amount, currency, description}),
            credentials: 'include'
        });
        const { redirect } = await resp.json();
        window.location = redirect;
}
