export const quoteEmailTemplate = `
<!doctype html>
<html>
  <body style="font-family: Arial, sans-serif; color: #1C3D2E; line-height: 1.5;">
    <h1 style="margin: 0 0 16px;">Your Spark Services Quote</h1>
    <p>Hi {{name}},</p>
    <p>Your quote for <strong>{{serviceType}}</strong> is ready.</p>
    {{#if testRecipient}}
      <p><strong>Dev test send:</strong> the customer entered {{customerEmail}}, but this email was routed to {{testRecipient}}.</p>
    {{/if}}
    <ul>
      <li>Bedrooms: {{bedrooms}}</li>
      <li>Bathrooms: {{bathrooms}}</li>
      <li>Extras: {{extras}}</li>
      <li>Total estimate: <strong>$ {{estimate}}</strong></li>
    </ul>
    <p>The PDF quote is attached. Our team will confirm access, timing, and final details before the booking is locked in.</p>
    <p>Thanks,<br />Spark Services</p>
  </body>
</html>
`;
