/**
 * Coded by Mahmoud Eskandari and phoenix marie. 
 * Email  : info@webafrooz.com
 * Website: http://webafrooz.com
 *
 * Webafrooz Web Development Group co.
 * License: MIT
 *
 * Bill Type Mapping:
 * 1: آب (Water)
 * 2: برق (Electricity)
 * 3: گاز (Gas)
 * 4: تلفن ثابت (Landline)
 * 5: موبایل (Mobile)
 * 6: شهرداری (Municipality)
 */

function IranBill(billNumber, paymentId) {
  const RANGE = [2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3];

  if (billNumber.length !== 13) return [-1];
  if (paymentId.length < 7) return [-2];

  paymentId = paymentId.padStart(13, '0');
  const billDigits = Array.from(billNumber, Number);
  const paymentDigits = Array.from(paymentId, Number);
  const type = billDigits[11];

  const checkSum = (digits, startIndex, length, rangeOffset = 0) => {
    return 11 - (digits
      .slice(startIndex, startIndex + length)
      .reduce((sum, digit, idx) => sum + digit * RANGE[idx + rangeOffset], 0) % 11);
  };

  const reversedBill = [...billDigits].reverse();
  const reversedPayment = [...paymentDigits].reverse();

  let m = checkSum(reversedBill, 1, 12);
  if (m > 9) m = 0;
  if (m !== reversedBill[0]) return [-1];

  m = checkSum(reversedPayment, 2, 11);
  if (m > 9) m = 0;
  if (m !== reversedPayment[1]) return [-2];

  const finalDigits = Array.from(billNumber + paymentId.slice(5, 12), Number).reverse();
  m = checkSum(finalDigits, 0, 20);
  if (m > 9) m = 0;
  if (m !== reversedPayment[0]) return [-2];

  const fee = parseInt(paymentId.slice(0, 8), 10) * 1000;
  if (!fee) return [-2];

  return [billNumber, paymentId, fee, type];
}
 
