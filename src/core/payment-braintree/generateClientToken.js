import fetch from '../fetch';

export async function generateClientToken(clientId) {
        
    /*let amount= 10;
    let currency = 'USD';
    let description = 'Just testing';*/

    const resp = await fetch('/getClientToken', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({clientId}),
        credentials: 'include'
    });
    
    return resp.json();

}
