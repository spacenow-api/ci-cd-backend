import moment from "moment";
import { Reservation, ListBlockedDates } from '../../data/models';

export async function blockDates(reservationId) {
  var dates = [], datesIsMulti = [];
  const reservation = await Reservation.findOne({
    where: {
      id: reservationId,
    }
  });

  if(reservation){
    var start = reservation.checkIn;
    var end = reservation.checkOut;
    var timeDiff = moment(end).diff(moment(start), "hours")
    var priceType = reservation.priceType;
    var isMultiPerGuest = reservation.isMultiPerGuest;
    var guests = reservation.guests;

    if (priceType === 'hourly') {
      while (0 < timeDiff) {
        datesIsMulti.push(moment(start).add(timeDiff - 1, "hours"));
        timeDiff--;
      }
    } else {
      if (priceType === 'daily') {
        while (start <= end) {
          datesIsMulti.push(moment(start));
          var newDate = start.setDate(start.getDate() + 1);
          start = new Date(newDate);
        }
      } else {
        while(start < end){
          datesIsMulti.push(moment(start));
          var newDate = start.setDate(start.getDate() + 1);
          start = new Date(newDate);
        }
      }
    }

    let requests = datesIsMulti.map(async (date) => {
      if (isMultiPerGuest === true) {
        await addGuestDates(date)
      } else {
        dates.push(date);
      }
    })

    function addGuestDates(date) {
      return new Promise(resolve => {
        for(let g = 0; g < guests; g++)
          dates.push(date);
      })
    }

    dates.map(async (blockedDates) => {
      await insertBlockDate(blockedDates);
    });

    async function insertBlockDate(blockedDates){
      await ListBlockedDates.findOrCreate({
        where: {
          listId: reservation.listId,
          reservationId,
          blockedDates
        },
        defaults: {
          listId: reservation.listId,
          reservationId,
          blockedDates
        }
      });
    };
  }
}