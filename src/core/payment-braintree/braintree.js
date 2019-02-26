import braintree from 'braintree';
import { payment_braintree as config } from '../../config';
import {updateReservation} from './updateReservation';
import {createTransaction} from './createTransaction';
import {createThread} from './createThread';
import {blockDates} from './blockDates';
import {emailBroadcast} from './email';

const braintreeRoutes = app => {

  var paymentConfig = {
    "api" : {
      "environment": braintree.Environment.Production,
      "merchantId" : config.braintree.merchantId,
      "publicKey": config.braintree.publicKey,
      "privateKey" : config.braintree.privateKey
    }
  }
 
  var gateway = braintree.connect(paymentConfig.api);

  app.post("/getClientToken", function (req, res) {
    gateway.clientToken.generate({
      customerId: req.clientId
    }, function(error, response) {
      if (error) 
        console.log('error from Get Token', error);
      else 
        res.send(JSON.stringify(response.clientToken));
    });
  });

  app.get('/braintree-cancel', async function(req, res) {
    var reservationId = req.query.id;
    res.redirect('/payment/' + reservationId);
  });

  app.post('/ipn_handler', async function(req, res) {
    var itemSKU, payerEmail, payerId, receiverEmail, receiverId, transactionId, total, currency, transactionFee, ipn_track_id;
    itemSKU = req.body.item_number1;
    payerEmail = req.body.payer_email;
    payerId = req.body.payer_id;
    receiverEmail = req.body.receiver_email;
    receiverId = req.body.receiver_id;
    transactionId = req.body.txn_id;
    total = req.body.payment_gross;
    if(req.body.payment_fee != undefined){
      transactionFee = req.body.payment_fee;
    }
    currency = req.body.mc_currency;
    ipn_track_id = req.body.ipn_track_id;
    if(req.body.payment_status === 'Completed'){
      await updateReservation(itemSKU);
      await createTransaction(
        itemSKU,
        payerEmail,
        payerId,
        receiverEmail,
        receiverId,
        transactionId,
        total,
        transactionFee,
        currency,
        ipn_track_id
      );
      await createThread(itemSKU);
      await blockDates(itemSKU);
      await emailBroadcast(itemSKU);
    }
    res.send("Payment status from ipn_handler.");
  });
   
  app.get('/braintree-success', async function(req, res) {

    const data = JSON.parse(req.query.data);
    const transaction = data.transaction;

    let transactionId = transaction.id;
    let currencyIsoCode = transaction.currencyIsoCode;
    let amount = transaction.amount;
    let merchantAccountId = transaction.merchantAccountId;
    let merchantEmail = config.braintree.email;
    let orderId = transaction.orderId;
    let serviceFeeAmount = transaction.serviceFeeAmount;
    let payerId = req.user.id;
    let payerEmail = req.user.email;

    await updateReservation(orderId);
    await createTransaction(
      orderId,
      payerEmail,
      payerId,
      merchantEmail,
      merchantAccountId,
      transactionId,
      amount,
      serviceFeeAmount,
      currencyIsoCode,
      ""
    );
    await createThread(orderId);
    await blockDates(orderId);
    await emailBroadcast(orderId);
    res.redirect(config.braintree.redirectURL.success + "/" + orderId);
    
  });

  app.post('/braintree-paynow', function(req, res) {

    var payment = {
      amount: req.body.amount,
      orderId: req.body.reservationId,
      paymentMethodNonce: req.body.nonce,
      options: {
        submitForSettlement: true,
        storeInVaultOnSuccess: true
      }
    }

    gateway.transaction.sale(payment, function (err, result) {

      if (err) {
        res.send({ redirect: config.braintree.cancelURL });
      }

      if (result.success) {
        res.send({ redirect: config.braintree.returnURL + '/?data=' + JSON.stringify(result) });
      } else {
        console.error(result.message);
        return;
      }
    })
  })

};

export default braintreeRoutes;