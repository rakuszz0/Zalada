import { LowStockMailTemplate } from "../models/Mail"

export default function LowStockTemplate(items: LowStockMailTemplate[]) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Low Stock Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      background-color: #f2f2f2;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 20px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .table th, .table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .footer {
      background-color: #f2f2f2;
      padding: 10px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Low Stock Notification</h2>
    </div>

    <div class="content">
      <p>Dear [Recipient Name],</p>

      <p>This is to inform you that some of the products in your inventory are running low on stock. Please take action to replenish the stock to avoid potential shortages.</p>

      <h3>Low Stock Products:</h3>

      <table class="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Current Stock</th>
          </tr>
        </thead>
        <tbody>
        ${(() => {
            const column = []

            for (const item of items) {
                const td = [
                    `<td>${item.name}</td>`,
                    `<td>${item.stock}</td>`
                ]

                const tr = `<tr> ${td.join('\n')} </tr>`

                column.push(tr)
            }

            return column.join('\n')
        })()
    }
          <tr>
            <td>[Product 1 Name]</td>
            <td>[Product 1 Stock]</td>
          </tr>
          <tr>
            <td>[Product 2 Name]</td>
            <td>[Product 2 Stock]</td>
          </tr>
          <!-- Add more rows for additional low stock products as needed -->
        </tbody>
      </table>

      <p>Thank you for your attention to this matter.</p>
    </div>

    <div class="footer">
      <p>Sincerely,<br>Your Company Name</p>
    </div>
  </div>
</body>
</html>
`
}