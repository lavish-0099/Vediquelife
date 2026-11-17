import { EmailFooter } from "@/components/emails/email-footer";
import { EmailHeader } from "@/components/emails/email-header";
interface ContactAdminMailProps {
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  message: string;
  timestamp: string;
}

const ContactAdminMail = ({
  name,
  email,
  phoneNumber,
  country,
  state,
  city,
  message,
  timestamp,
}: ContactAdminMailProps) => {
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
          Dear Admin!
        </h1>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "500",
            marginTop: "10px",
            color: "#555",
          }}
        >
          Someone has contacted you via Vedique Website. Here are the details:
        </h2>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Name:</strong> {name}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Email:</strong> {email}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Phone Number:</strong> {phoneNumber}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Country:</strong> {country}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>State:</strong> {state}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>City:</strong> {city}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Query:</strong> {message}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Query received at:</strong> {timestamp}
        </p>
      </div>

      {/* Footer */}
      <EmailFooter />
    </div>
  );
};

export default ContactAdminMail;
