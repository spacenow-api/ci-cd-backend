import braintree from "braintree";
import { payment_braintree as config } from "../../../config";
import { createTransaction } from "./createTransaction";

const refundRoutes = app => {
  var paymentConfig = {
    api: {
      environment: braintree.Environment.Production,
      merchantId: config.braintree.merchantId,
      publicKey: config.braintree.publicKey,
      privateKey: config.braintree.privateKey
    }
  };

  var gateway = braintree.connect(paymentConfig.api);

  app.post("/braintree-refund", async function(req, res) {
    // paypal payment configuration.

    const transactionId = req.body.transactionId;
    const transactionFee = req.body.transactionFee;
    const reservationId = req.body.reservationId;
    const receiverEmail = req.body.receiverEmail;
    const receiverId = req.body.receiverId;
    const payerEmail = req.body.payerEmail;
    const payerId = req.body.payerId;
    const amount = req.body.amount;
    const currency = req.body.currency;

    gateway.transaction.refund(transactionId, async function(err, result) {
      if (result.success) {
        await createTransaction(reservationId, receiverEmail, receiverId, payerId, payerEmail, transactionId, amount, transactionFee, currency);
        console.log("RESP", res);
        res.send({ status: "SUCCESS" });
      } else {
        res.send({ status: err });
      }
    });
  });
};

export default refundRoutes;
