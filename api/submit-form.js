// This is a serverless function that will handle form submissions
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Here you can:
    // 1. Save to a database
    // 2. Send an email notification
    // 3. Log the submission
    
    // For now, we'll just log the submission
    console.log('New form submission:', { name, email, message });
    
    // Return success response
    return res.status(200).json({ 
      success: true,
      message: 'Message sent successfully!' 
    });
    
  } catch (error) {
    console.error('Error processing form:', error);
    return res.status(500).json({ 
      error: 'Error processing your message',
      details: error.message 
    });
  }
}
