import fetch from '../../fetch';

export async function sendPaymentToHost(reservationId, hostEmail, payoutId, amount, currency, userId) {
    const resp = await fetch('/braintree-payout', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({reservationId, hostEmail, payoutId, amount, currency, userId}),
        credentials: 'include'
    });
    const { status } = await resp.json();
    return { status };
}