
var nodemailer = require("nodemailer");

const fs = require('fs');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument();
const nodeHtmlToImage = require('node-html-to-image')

exports.invoiceEmail = async (email,payment) => {

try {
  const month = [
    { num: 1, month: "January" },
    { num: 2, month: "February" },
    { num: 3, month: "March" },
    { num: 4, month: "April " },
    { num: 5, month: "May " },
    { num: 6, month: "June" },
    { num: 7, month: "July" },
    { num: 8, month: "August" },
    { num: 9, month: "September" },
    { num: 10, month: "October" },
    { num: 11, month: "November" },
    { num: 12, month: "December" },
  ];
  const getMonth = await month.filter((task) => task.num == eval(payment.validDate.split('/')[0]));

  const date = payment.date.split('/')
const text = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      padding:10px;
        width: 1000px;
        height: 100vh;   
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    .invoice-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .invoice-header h1 {
      margin: 0;
    }
    .invoice-header p {
      margin: 0;
    }
    .invoice-details {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .invoice-details p {
      margin: 0;
    }
    .invoice-items {
      margin-bottom: 20px;
    }
    .invoice-items th {
      background-color: #ddd;
    }
    .invoice-total {
      display: flex;
      justify-content: flex-end;
    }
    .invoice-total p {
      margin: 0;
    }
    .customer-details {
      margin-bottom: 20px;
    }
    .customer-details p {
      margin: 0;
    }
    .invoice-logo {
      margin-bottom: 20px;
    }
    .invoice-logo img {
      max-width: 100%;
    }
  </style>
</head>
<body>
  <div class="invoice-header">
    <div class="invoice-logo">
      <img style="width: 150px;" src="https://upload.incrix.com/search?url=/file/MasterAcademy/image/file-1697039117590.png" alt="The Master Academy Logo">
    </div>
    <h1   style="font-size: 25px;"  >The Master Academy</h1>
    <p>Date: ${date[1]}/${date[0]}/${date[2]}</p>
  </div>
  <div class="customer-details">
    <p>Customer Name: ${payment.name}</p>
    <p>Address:${payment.address}, ${payment.city},${payment.pincode}</p>
    <p>Order ID:${payment._id}</p>
  </div>
  <div class="invoice-details">
    <p>Invoice No: 12345</p>
    <p>Course Name: ${payment.courseName}</p>
  </div>
  <table class="invoice-items">
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Package Month</th>
        <th>Price</th>
        <th>Discount</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${payment.courseName}</td>
        <td>1</td>
        <td>${payment.planMonth}</td>
        <td>₹${payment.amount}</td>
        <td>₹${payment.discount}</td>
        <td>₹${payment.totalAmount}</td>
      </tr>
    </tbody>
  </table>
  <div class="invoice-total">
    <p>Total:₹${payment.totalAmount}</p>
    <p>Course Valid Until: ${payment.validDate.split('/')[1]} ${" "} ${getMonth[0].month} ${" "} ${payment.validDate.split('/')[2]}</p>
  </div>
</body>
</html>
`

nodeHtmlToImage({
  output: `./invoice/${email}.png`,
  html: text,
  option:{
    format: "A4",
  }
})
  .then(() => {console.log('The image was created successfully!')

  fs.readFile(`./invoice/${email}.png`, (err, imageData) => {
    if (err) {
      console.error('Error reading image:', err);
      return;
    }
    doc.image(imageData, 50, 50,{ width: 500 });
    doc.end();
    doc.pipe(fs.createWriteStream(`./invoice/${email}.pdf`))
    var transporter = nodemailer.createTransport({
      host: process.env.HOST,
      name: process.env.NAME,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });
  
    var mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "[The Master Academy] Please verify your account",
      attachments: [
        {
          filename: "file.pdf",
          path: `./invoice/${email}.pdf`,
        },
      ],
    };
  
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        if (info.response) {
          console.log(info.response)
          var filePath = `./invoice/${email}.pdf`;
         await fs.unlinkSync(filePath)
          await fs.unlinkSync(`./invoice/${email}.png`);
         
        }
      }
    })
  
  })
  
})

} catch (error) {
  throw error
}
}
