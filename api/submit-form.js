import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('Environment variables:', {
      user: process.env.GMAIL_USER ? 'Set' : 'Not set',
      pass: process.env.GMAIL_PASS ? 'Set' : 'Not set'
    });

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    // Verify connection configuration
    await transporter.verify(function(error, success) {
      if (error) {
        console.error('SMTP connection error:', error);
        throw new Error('SMTP connection failed');
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Send to yourself
      subject: `New message from ${name}`,
      text: `
        You received a new message from your portfolio:
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    return res.status(200).json({ 
      success: true,
      message: 'Message sent successfully!' 
    });
    
  } catch (error) {
    console.error('Error processing form:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Error sending message. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
