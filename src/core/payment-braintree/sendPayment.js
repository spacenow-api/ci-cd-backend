import fetch from '../fetch';

export async function sendPayment(reservationId, amount, currency, description, nonce) {

    const resp = await fetch("/braintree-paynow", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            reservationId,
            amount,
            currency,
            description,
            nonce
        }),
        credentials: "include"
    });
    const { redirect } = await resp.json();
    window.location = redirect;
}
