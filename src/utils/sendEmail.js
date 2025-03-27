import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email credentials not configured");
      return false;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.USER_NAME || "Your Site"}" <${
        process.env.EMAIL_USER
      }>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const createReplyTemplate = (name, reply) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reply to your message</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style type="text/css">
        @media only screen and (max-width: 600px) {
          .container {
            width: 100% !important;
          }
          .content-box {
            padding: 20px !important;
          }
        }
      </style>
    </head>
    <body class="bg-gray-100 font-sans">
      <!-- Main Container -->
      <div class="max-w-2xl mx-auto p-4">
        <!-- Email Card -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <!-- Header -->
          <div class="bg-indigo-600 py-6 px-8 text-center">
            <h1 class="text-white text-2xl font-bold">${
              process.env.USER_NAME || "Our Team"
            }</h1>
            <p class="text-indigo-100 mt-1">Customer Support</p>
          </div>
          
          <!-- Content -->
          <div class="p-8">
            <h2 class="text-gray-800 text-xl font-semibold mb-4">Hello ${name},</h2>
            
            <p class="text-gray-600 mb-6">
              Thank you for contacting us. Here's our response to your inquiry:
            </p>
            
            <!-- Reply Content -->
            <div class="bg-gray-50 border-l-4 border-indigo-500 p-4 mb-6 rounded-r-lg">
              ${reply.replace(/\n/g, "<br>")}
            </div>
            
            <p class="text-gray-600 mb-6">
              If you have any further questions or need additional assistance, 
              please don't hesitate to reply to this email.
            </p>
            
            <!-- Signature -->
            <div class="border-t border-gray-200 pt-6 mt-6">
              <p class="text-gray-600">
                Best regards,<br>
                <span class="text-gray-800 font-medium">${
                  process.env.USER_NAME || "Our Team"
                }</span>
              </p>
              ${
                process.env.SITE_URL
                  ? `
              <p class="mt-2">
                <a href="${process.env.SITE_URL}" class="text-indigo-600 hover:text-indigo-800 text-sm">Visit our website</a>
              </p>
              `
                  : ""
              }
            </div>
          </div>
          
          <!-- Footer -->
          <div class="bg-gray-50 px-8 py-6 text-center">
            <p class="text-gray-500 text-xs">
              © ${new Date().getFullYear()} ${
    process.env.USER_NAME || "Your Site"
  }. All rights reserved.
  </p>
  ${
    process.env.SITE_URL
      ? `
  <p class="mt-2">
    <a href="${
      process.env.SITE_URL
    }" class="text-indigo-600 hover:text-indigo-800 text-xs">Website</a>
    ${
      process.env.CONTACT_EMAIL
        ? `
    <span class="mx-2 text-gray-300">•</span>
    <a href="mailto:${process.env.CONTACT_EMAIL}" class="text-indigo-600 hover:text-indigo-800 text-xs">Contact</a>
    `
        : ""
    }
  </p>
  `
      : ""
  }
          </div>
        </div>
      </div>
    </body>
    </html>
  `
};
