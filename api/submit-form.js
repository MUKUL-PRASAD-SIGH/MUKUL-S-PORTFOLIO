import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message, 'g-recaptcha-response': recaptchaToken } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false,
        error: 'All fields are required' 
      });
    }

    // Skip reCAPTCHA verification in development
    if (process.env.NODE_ENV !== 'development') {
      if (!recaptchaToken || recaptchaToken === 'bypass-for-development') {
        return res.status(400).json({
          success: false,
          error: 'reCAPTCHA verification failed. Please try again.'
        });
      }

      // Verify reCAPTCHA with Google in production
      const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
      const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;
      
      const recaptchaResponse = await fetch(recaptchaUrl, { method: 'POST' });
      const recaptchaData = await recaptchaResponse.json();
      
      if (!recaptchaData.success) {
        console.error('reCAPTCHA verification failed:', recaptchaData);
        return res.status(400).json({ 
          success: false,
          error: 'reCAPTCHA verification failed. Please try again.'
        });
      }
    } else {
      console.log('Running in development mode - reCAPTCHA verification skipped');
    }

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Send to yourself
      replyTo: `"${name}" <${email}>`,
      subject: `New message from ${name} - Portfolio Contact`,
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
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <br>
        <p>---</p>
        <p>This message was sent from your portfolio contact form.</p>
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
