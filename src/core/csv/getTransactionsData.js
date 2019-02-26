import { TransactionHistory, Reservation } from '../../data/models';

export async function completedTransactions(userId) {
    let dataItems = [];
    const data = await TransactionHistory.findAll({
        where: {
            userId
        }
    });
    if(data && data.length > 0) {
        data.map((item) => {
            let dataItem = {};
            dataItem = {
                'Date': item.createdAt,
                'Type': 'Payout',
                'ReservationId': item.reservationId,
                'PayoutEmail': item.payoutEmail,
                'Amount': item.amount,
                'Currency': item.currency
            };
            dataItems.push(dataItem);
        })
    }
    return dataItems;
}

export async function futureTransactions(hostId) {
    let dataItems = [];
    const data = await Reservation.findAll({
        where: {
            hostId,
            paymentState: 'completed',
            reservationState: 'approved'
        }
    });
    if(data && data.length > 0) {
        data.map((item) => {
            let dataItem = {};
            dataItem = {
                'Estimated Date': item.checkOut,
                'Type': 'Reservation',
                'ReservationId': item.id,
                'Estimated Amount': item.total,
                'Currency': item.currency
            };
            dataItems.push(dataItem);
        })
    }
    return dataItems;
}

export async function grossEarnings(hostId) {
    let dataItems = [];
    const data = await Reservation.findAll({
        where: {
            hostId,
            paymentState: 'completed',
            reservationState: 'completed'
        },
        include: [
            {
                model: TransactionHistory, 
                as: 'transactionHistory',
                required: true,
                where: {
                    userId: hostId
                }
            }
        ]
    });
    
    if(data && data.length > 0) {
        data.map((item) => {
            let dataItem = {};
            dataItem = {
                'Date': item.transactionHistory[0].createdAt,
                'Type': 'Gross Earnings',
                'ReservationId': item.id,
                'Amount with Host Service Fee': Number(item.total + item.hostServiceFee),
                'Currency': item.currency
            };
            dataItems.push(dataItem);
        })
    }
    return dataItems;
}