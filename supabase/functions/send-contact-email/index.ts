import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  subject: string;
  message: string;
  testEmail?: string; // For testing purposes
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: ContactEmailRequest = await req.json();
    const { name, email, phone, location, subject, message, testEmail } = body;

    console.log("Received contact form submission:", { name, email, subject });

    // Get SMTP configuration from environment
    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "587");
    const smtpUsername = Deno.env.get("SMTP_USERNAME");
    const smtpPassword = Deno.env.get("SMTP_PASSWORD");

    if (!smtpHost || !smtpUsername || !smtpPassword) {
      console.error("SMTP configuration missing");
      return new Response(
        JSON.stringify({ 
          error: "SMTP configuration is not set up. Please configure SMTP settings in admin panel." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Get from email from site settings
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2.38.4");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: settings } = await supabase
      .from("site_settings")
      .select("*");

    const settingsMap = settings?.reduce((acc: any, setting: any) => {
      acc[setting.setting_key] = setting.setting_value;
      return acc;
    }, {} as any) || {};

    const contactEmail = settingsMap.contact_email || smtpUsername;
    const fromName = settingsMap.contact_from_name || "Contact Form";

    console.log("Sending email to:", contactEmail);

    // Create email content
    const emailContent = testEmail 
      ? `This is a test email from your SMTP configuration.\n\nTest email sent to: ${testEmail}`
      : `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ''}${location ? `Location: ${location}\n` : ''}Subject: ${subject}\n\nMessage:\n${message}`;

    const recipientEmail = testEmail || contactEmail;

    // Connect to SMTP server and send email
    try {
      const conn = await Deno.connect({
        hostname: smtpHost,
        port: smtpPort,
      });

      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      // Helper function to send SMTP command
      const sendCommand = async (command: string) => {
        console.log("SMTP Command:", command);
        await conn.write(encoder.encode(command + "\r\n"));
        
        const buffer = new Uint8Array(1024);
        const n = await conn.read(buffer);
        const response = decoder.decode(buffer.subarray(0, n!));
        console.log("SMTP Response:", response);
        return response;
      };

      // SMTP conversation
      await sendCommand(""); // Initial greeting
      await sendCommand(`EHLO ${smtpHost}`);
      await sendCommand("STARTTLS");

      // After STARTTLS, we need to upgrade to TLS
      const tlsConn = await Deno.startTls(conn, { hostname: smtpHost });
      
      const sendTlsCommand = async (command: string) => {
        console.log("SMTP Command:", command);
        await tlsConn.write(encoder.encode(command + "\r\n"));
        
        const buffer = new Uint8Array(1024);
        const n = await tlsConn.read(buffer);
        const response = decoder.decode(buffer.subarray(0, n!));
        console.log("SMTP Response:", response);
        return response;
      };

      await sendTlsCommand(`EHLO ${smtpHost}`);
      await sendTlsCommand("AUTH LOGIN");
      await sendTlsCommand(btoa(smtpUsername));
      await sendTlsCommand(btoa(smtpPassword));
      await sendTlsCommand(`MAIL FROM:<${smtpUsername}>`);
      await sendTlsCommand(`RCPT TO:<${recipientEmail}>`);
      await sendTlsCommand("DATA");

      const emailData = [
        `From: ${fromName} <${smtpUsername}>`,
        `To: <${recipientEmail}>`,
        `Subject: ${testEmail ? 'Test Email' : `Contact Form: ${subject}`}`,
        "Content-Type: text/plain; charset=utf-8",
        "",
        emailContent,
        ".",
      ].join("\r\n");

      await sendTlsCommand(emailData);
      await sendTlsCommand("QUIT");

      tlsConn.close();

      console.log("Email sent successfully");

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: testEmail ? "Test email sent successfully!" : "Email sent successfully" 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    } catch (smtpError: any) {
      console.error("SMTP Error:", smtpError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to send email via SMTP", 
          details: smtpError.message 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
