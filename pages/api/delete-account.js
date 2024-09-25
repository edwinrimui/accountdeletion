import sgMail from '@sendgrid/mail';

// Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Ensure this key is set in your environment variables

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, memberNo, reason } = req.body; // Include memberNo in the request body

    // Validate the input (basic validation)
    if (!email || !reason || !memberNo) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Here you would typically:
    // 1. Check if the user exists (not implemented in this example)
    // 2. Initiate the account deletion process (not implemented in this example)
    // 3. Send a confirmation email
    // 4. Log the deletion request (not implemented in this example)

    const msg = {
      to: email, // Recipient's email
      from: 'edwinngera@gmail.com', // Your verified SendGrid sender email
      subject: 'Account Deletion Request Received',
      text: `Dear User,\n\nYour account deletion request has been received. Here are the details:\n\n- Email: ${email}\n- Member No: ${memberNo}\n- Reason: ${reason}\n\nIf you did not make this request, please contact support.\n\nThank you,\nYour Company Name`,
      html: `<p>Dear User,</p><p>Your account deletion request has been received. Here are the details:</p><ul><li><strong>Email:</strong> ${email}</li><li><strong>Member No:</strong> ${memberNo}</li><li><strong>Reason:</strong> ${reason}</li></ul><p>If you did not make this request, please contact support.</p><p>Thank you,<br>Your Company Name</p>`,
    };

    try {
      // Send email
      await sgMail.send(msg);
      console.log(`Deletion request received for ${email}. Reason: ${reason}`);

      // Simulate a slight delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      res.status(200).json({ message: 'Deletion request submitted successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending confirmation email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
