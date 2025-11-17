Iran Bill Validator

A lightweight, client-side web tool for validating Iranian bill numbers and payment IDs.
The validator performs checksum verification, pads short payment IDs, extracts the bill type, and calculates the fee — all securely in the browser with zero backend dependencies.

This project is ideal for educational use, financial utilities, and billing-related integrations where quick validation is needed.


---

Features

✔️ Validates Iranian bill numbers (13 digits)

✔️ Validates payment IDs (7–13 digits)

✔️ Applies all three official checksum rules

✔️ Automatically pads short payment IDs to 13 digits

✔️ Calculates the fee from the payment ID

✔️ Decodes the bill type (water, electricity, gas, etc.)

✔️ 100% client-side, no data sent anywhere

✔️ Includes a modern, responsive UI

✔️ Fully accessible (ARIA-friendly, keyboard-friendly)



---

Demo

You can open the index.html file directly in any modern browser.

No build step required.


---

How the Validation Works

The validator implements the official Iranian bill format rules:

1. Bill Number Checksum

Uses a weighted modulus-11 check

Validates the last digit of the 13-digit bill number


2. Payment ID Checksum

Another modulus-11 check applied to the padded 13-digit payment ID


3. Combined Checksum

Validates the concatenation of
billNumber + paymentId[5..11]


4. Fee Calculation

Extracts the first 8 digits of the padded payment ID

Converts to fee in rials (number × 1000)


If any rule fails, an error code is returned.


---

Return Format

The main function returns:

[-1]             // invalid bill number
[-2]             // invalid payment ID
[bill, paddedPaymentId, fee, type]

Example of a valid response:

[
  "0123456789012",
  "0012345678901",
  2500000,
  2
]


---

Bill Type Codes

Code	Service

1	آب (Water)
2	برق (Electricity)
3	گاز (Gas)
4	تلفن ثابت (Landline)
5	موبایل (Mobile)
6	شهرداری (Municipality)



---

Project Structure

.
├── index.html      # Main application UI + validator logic
├── README.md       # Project documentation
└── LICENSE         # MIT License

All logic is self-contained in the page for maximum portability.


---

Usage

Run Locally

Simply open:

index.html

No server required.


---

Core Function

The key validator is:

IranBill(billNumber, paymentId)

Example

const result = IranBill("1234567890123", "9876543");

if (result[0] === -1) {
  console.log("Invalid bill number");
} else if (result[0] === -2) {
  console.log("Invalid payment ID");
} else {
  const [bill, paddedPay, fee, type] = result;
  console.log({ bill, paddedPay, fee, type });
}


---

Security

This tool is fully offline.
All data is processed in-browser and never transmitted.


---

Browser Support

✔ Chrome
✔ Firefox
✔ Safari
✔ Edge
✔ Mobile browsers

(IE not supported)


---

License

This project is released under the MIT License.
Feel free to use, modify, and distribute.


---

Contributing

Pull requests and improvements are always welcome.
If you'd like to help with refactoring, performance, UI enhancements, or internationalization, feel free to open an issue or PR.
