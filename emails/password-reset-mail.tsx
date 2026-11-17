import { EmailFooter } from "@/components/emails/email-footer";
import { EmailHeader } from "@/components/emails/email-header";

interface EmailVerificationMailProps {
  name: string;
  token: string;
}

const EmailVerificationMail = ({ name, token }: EmailVerificationMailProps) => {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const resetLink = `${domain}/auth/new-password?token=${token}`;
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
          Password Reset Request
        </h2>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          You have requested to reset your password for your Vedique account.
          Please click on the link below to reset your password:
        </p>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <a
            href={resetLink}
            style={{
              display: "inline-block",
              padding: "10px 20px",
              background: "#264d25",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Reset Password
          </a>
        </div>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          If you did not request a password reset, please ignore this email.
          This link will expire in 6 hours for security reasons.
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

export default EmailVerificationMail;
