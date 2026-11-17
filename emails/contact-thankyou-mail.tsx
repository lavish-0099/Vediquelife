import { EmailFooter } from "@/components/emails/email-footer";
import { EmailHeader } from "@/components/emails/email-header";

interface ContactThankyouMailProps {
  name: string;
}

const ContactThankyouMail = ({ name }: ContactThankyouMailProps) => {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  return (
    <div
      style={{
        background: "#f2f2f2",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Header */}
      <EmailHeader domain={domain || ""} />

      {/* Main Content */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0px auto",
          padding: "20px",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderBottom: "4px solid #264d25",
          borderTop: "4px solid #264d25",
          borderLeft: "1px solid #264d25",
          borderRight: "1px solid #264d25",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
          Dear {name}!
        </h1>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "500",
            marginTop: "10px",
            color: "#555",
          }}
        >
          Greetings from Vedique. Thank you for getting in touch with us.
        </h2>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          Thank you for contacting us. We have received your message and our
          team will get back to you as soon as possible. We appreciate your
          interest in our website and are excited to assist you with your query.
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          Meanwhile, feel free to explore our extensive range of herbal products
          and wellness guides tailored to suit your unique needs and health
          goals. If you have any urgent queries, please don't hesitate to reach
          out to us at{" "}
          <a
            href="mailto:connect@ranfortwellness.com"
            style={{ color: "#264d25", textDecoration: "underline" }}
          >
            connect@ranfortwellness.com
          </a>
          .
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          Thank you once again for reaching out to us. We look forward to
          assisting you.
        </p>
        <div style={{ textAlign: "left", marginTop: "20px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#333",
              margin: "0",
            }}
          >
            Thank you,
          </h2>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "500",
              marginTop: "5px",
              color: "#555",
            }}
          >
            Team Vedique
          </h3>
        </div>
      </div>

      {/* Footer */}
      <EmailFooter />
    </div>
  );
};

export default ContactThankyouMail;
