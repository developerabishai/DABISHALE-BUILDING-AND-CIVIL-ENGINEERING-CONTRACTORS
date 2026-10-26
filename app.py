# ===== DABISHALE CONSTRUCTORS - FULL EMAIL BACKEND =====
import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

print("🚀 Starting Dabishale Constructors Email Backend...")

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
from datetime import datetime
import logging

# Load environment variables
load_dotenv()

# Create Flask app that serves static frontend files directly
app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)  # Allow website to connect

# ===== EMAIL CONFIGURATION =====
mail_user = os.getenv('MAIL_USERNAME', 'abishaikyalo@gmail.com').strip()
mail_pass = os.getenv('MAIL_PASSWORD', 'jwghrdcoqccygqml').replace(' ', '').strip()

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = mail_user
app.config['MAIL_PASSWORD'] = mail_pass
app.config['MAIL_DEFAULT_SENDER'] = mail_user

mail = Mail(app)

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

print("=" * 60)
print("DABISHALE CONSTRUCTORS - WEBSITE & EMAIL BACKEND")
print("=" * 60)
print(f"📧 Email sender: {app.config['MAIL_USERNAME']}")
print(f"📨 Sending to: abishaikyalo@gmail.com")
print("=" * 60)

@app.route('/')
def home():
    """Serve the Dabishale website"""
    return send_from_directory('.', 'index.html')

@app.route('/api/status')
@app.route('/api/health')
def status():
    """Health check endpoint"""
    return jsonify({
        "service": "Dabishale Constructors Email Service",
        "status": "Running ✅",
        "email_sending": "ACTIVE",
        "recipient": "abishaikyalo@gmail.com",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions and send email"""
    try:
        print("\n" + "=" * 50)
        print("📧 NEW CONTACT FORM SUBMISSION")
        print("=" * 50)
        
        # Get form data
        data = request.json
        
        # Validate required fields
        required_fields = ['name', 'email', 'message', 'service']
        for field in required_fields:
            if not data.get(field):
                error_msg = f"Missing required field: {field}"
                print(f"❌ {error_msg}")
                return jsonify({
                    "success": False,
                    "message": error_msg
                }), 400
        
        # Extract data
        name = data['name']
        email = data['email']
        phone = data.get('phone', 'Not provided')
        service = data['service']
        message_text = data['message']
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Map service to display name
        service_names = {
            'residential': '🏠 Residential Construction',
            'commercial': '🏢 Commercial Construction',
            'renovation': '🔨 Renovation & Remodeling',
            'civil': '🛣️ Civil Construction',
            'other': '📋 Other Service'
        }
        service_display = service_names.get(service, service)
        
        # Print to console
        print(f"👤 Name: {name}")
        print(f"📧 Email: {email}")
        print(f"📞 Phone: {phone}")
        print(f"🏗️ Service: {service_display}")
        print(f"⏰ Time: {timestamp}")
        print("=" * 50)
        
        # ===== CREATE EMAIL =====
        # Email to YOU (abishaikyalo@gmail.com)
        recipient_email = "abishaikyalo@gmail.com"  # FIXED - added @gmail.com
        
        msg = Message(
            subject=f"📞 New Contact: {name} - {service_display.split()[-1]}",
            recipients=[recipient_email],
            reply_to=email,  # So you can reply directly to customer
            sender=app.config['MAIL_USERNAME']
        )
        
        # HTML Email with professional design
        msg.html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5; }}
                .container {{ max-width: 700px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }}
                .header {{ background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #000; padding: 30px; text-align: center; }}
                .header h1 {{ margin: 0; font-size: 28px; font-weight: bold; }}
                .header h2 {{ margin: 10px 0 0 0; font-size: 18px; opacity: 0.9; }}
                .content {{ padding: 30px; }}
                .field {{ margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #eee; }}
                .field:last-child {{ border-bottom: none; }}
                .label {{ font-weight: bold; color: #020617; font-size: 16px; display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }}
                .value {{ color: #475569; font-size: 16px; line-height: 1.5; }}
                .message-box {{ background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #fbbf24; margin-top: 10px; }}
                .footer {{ background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; border-top: 1px solid #e2e8f0; }}
                .highlight {{ background: #fffbeb; padding: 10px; border-radius: 5px; border: 1px solid #fef3c7; margin: 20px 0; }}
                .icon {{ color: #f59e0b; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>DABISHALE CONSTRUCTORS</h1>
                    <h2>New Contact Form Submission</h2>
                </div>
                
                <div class="content">
                    <div class="highlight">
                        <strong>📋 ACTION REQUIRED:</strong> New customer inquiry received. Please respond within 24 hours.
                    </div>
                    
                    <div class="field">
                        <div class="label"><span class="icon">👤</span> Customer Name:</div>
                        <div class="value">{name}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label"><span class="icon">📧</span> Email Address:</div>
                        <div class="value">
                            <a href="mailto:{email}" style="color: #f59e0b; text-decoration: none; font-weight: 500;">{email}</a>
                            <br>
                            <small>(Click to reply directly)</small>
                        </div>
                    </div>
                    
                    <div class="field">
                        <div class="label"><span class="icon">📞</span> Phone Number:</div>
                        <div class="value">
                            <a href="tel:{phone}" style="color: #059669; text-decoration: none; font-weight: 500;">{phone}</a>
                            <br>
                            <small>(Click to call)</small>
                        </div>
                    </div>
                    
                    <div class="field">
                        <div class="label"><span class="icon">🏗️</span> Service Interested:</div>
                        <div class="value">
                            <strong style="color: #059669; background: #d1fae5; padding: 5px 10px; border-radius: 5px; display: inline-block;">
                                {service_display}
                            </strong>
                        </div>
                    </div>
                    
                    <div class="field">
                        <div class="label"><span class="icon">💬</span> Customer Message:</div>
                        <div class="message-box">{message_text}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label"><span class="icon">⏰</span> Submission Time:</div>
                        <div class="value">{timestamp} (Nairobi Time)</div>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 20px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
                        <h3 style="color: #059669; margin-top: 0;">✅ Next Steps:</h3>
                        <ol style="color: #475569; padding-left: 20px;">
                            <li><strong>Reply to customer</strong> within 24 hours</li>
                            <li><strong>Call</strong> if urgent: {phone}</li>
                            <li><strong>Schedule</strong> site visit if needed</li>
                            <li><strong>Prepare</strong> quotation for {service_display.lower()}</li>
                        </ol>
                    </div>
                </div>
                
                <div class="footer">
                    <p>This message was automatically sent from the DABISHALE CONSTRUCTORS website contact form.</p>
                    <p>📍 Nairobi, Kenya | 📧 abishaikyalo@gmail.com | 📞 +254 725752834</p>
                    <p style="font-size: 12px; margin-top: 10px; color: #94a3b8;">
                        <em>Do not reply to this automated email. Reply directly to customer's email above.</em>
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Plain text version (for email clients that don't support HTML)
        msg.body = f"""
        DABISHALE CONSTRUCTORS - NEW CONTACT FORM
        
        Customer: {name}
        Email: {email} (Reply directly to this email)
        Phone: {phone}
        Service: {service_display}
        Time: {timestamp}
        
        Message:
        {message_text}
        
        ---
        ACTION REQUIRED: Please reply to customer within 24 hours.
        This is an automated message from DABISHALE CONSTRUCTORS website.
        """
        
        # ===== SEND EMAIL =====
        print("📤 Sending email to abishaikyalo@gmail.com...")
        mail.send(msg)
        print("✅ Email sent successfully!")
        print("=" * 50)
        
        # Also send auto-reply to customer (optional)
        try:
            customer_msg = Message(
                subject=f"Thank you for contacting DABISHALE CONSTRUCTORS",
                recipients=[email],
                sender=app.config['MAIL_USERNAME']
            )
            
            customer_msg.html = f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #f59e0b;">Thank You, {name}!</h2>
                <p>We have received your inquiry about <strong>{service_display}</strong>.</p>
                <p>Our team will review your message and contact you within <strong>24 hours</strong>.</p>
                
                <div style="background: #fffbeb; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <strong>📋 Your Inquiry Summary:</strong><br>
                    • Service: {service_display}<br>
                    • Submitted: {timestamp}<br>
                    • Reference: DAB-{datetime.now().strftime('%Y%m%d')}
                </div>
                
                <p>For urgent matters, call us: <strong>+254 725752834</strong></p>
                
                <p>Best regards,<br>
                <strong>DABISHALE CONSTRUCTORS Team</strong><br>
                Building Kenya's Future Since 2004</p>
            </div>
            """
            
            mail.send(customer_msg)
            print("📧 Auto-reply sent to customer")
            
        except Exception as auto_reply_error:
            print(f"⚠️ Could not send auto-reply: {auto_reply_error}")
        
        return jsonify({
            "success": True,
            "message": "✅ Thank you! Your message has been sent. We will contact you within 24 hours.",
            "email_sent": True,
            "customer_email": "Auto-reply sent to your email",
            "reference": f"DAB-{datetime.now().strftime('%Y%m%d')}"
        })
        
    except Exception as e:
        error_msg = str(e)
        print(f"❌ EMAIL SENDING ERROR: {error_msg}")
        logger.error(f"Email error: {error_msg}")
        
        # If it's an authentication error
        if "Authentication" in error_msg or "credentials" in error_msg.lower():
            return jsonify({
                "success": False,
                "message": "Email configuration error. Please check Gmail app password setup.",
                "debug": "Update MAIL_USERNAME and MAIL_PASSWORD in .env file"
            }), 500
        else:
            return jsonify({
                "success": False,
                "message": f"Email sending failed: {error_msg}"
            }), 500

@app.route('/api/test', methods=['GET'])
def test():
    """Test endpoint"""
    return jsonify({
        "success": True,
        "message": "🎉 Email backend test successful!",
        "email_configured": bool(app.config['MAIL_USERNAME'] and app.config['MAIL_PASSWORD']),
        "recipient": "abishaikyalo@gmail.com"
    })

if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("📋 SETUP CHECKLIST:")
    print("=" * 60)
    
    # Check if email credentials are set
    username = app.config['MAIL_USERNAME']
    password = app.config['MAIL_PASSWORD']
    
    if 'your-email@gmail.com' in username or 'your-app-password' in password:
        print("❌ WARNING: Default email credentials detected!")
        print("👉 Please update your .env file with:")
        print("   MAIL_USERNAME=your-email@gmail.com")
        print("   MAIL_PASSWORD=your-16-character-app-password")
        print("\n🔐 How to get Gmail App Password:")
        print("   1. Enable 2-Step Verification on Google")
        print("   2. Go to: https://myaccount.google.com/apppasswords")
        print("   3. Generate password for 'Mail' app")
        print("   4. Copy 16-character password to .env file")
    else:
        print(f"✅ Email configured: {username}")
        print("✅ Ready to send emails to: abishaikyalo@gmail.com")
    
    port = int(os.environ.get('PORT', 5000))
    is_debug = os.environ.get('FLASK_DEBUG', 'false').lower() in ('true', '1') if os.environ.get('PORT') else True
    print("\n" + "=" * 60)
    print(f"🌐 Server starting at: http://localhost:{port}")
    print("📧 Email testing: Submit contact form on website")
    print("=" * 60)
    
    app.run(debug=is_debug, host='0.0.0.0', port=port)