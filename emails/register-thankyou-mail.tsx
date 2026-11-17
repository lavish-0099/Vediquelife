import { EmailFooter } from "@/components/emails/email-footer";
import { EmailHeader } from "@/components/emails/email-header";
import { Img } from "@react-email/components"; // Ensure Img component is correctly imported

interface RegisterThankyouMailProps {
  name: string;
  token: string;
}

const RegisterThankyouMail = ({ name, token }: RegisterThankyouMailProps) => {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
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
          Greetings from Vedique, Thank you for registering with us.
        </h2>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          To complete your registration and activate your account, please verify
          your email address by clicking the button below:
        </p>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <a
            href={confirmLink}
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
            Activate Your Account
          </a>
        </div>

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

export default RegisterThankyouMail;
