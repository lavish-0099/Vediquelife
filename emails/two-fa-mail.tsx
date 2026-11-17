import { EmailFooter } from "@/components/emails/email-footer";
import { EmailHeader } from "@/components/emails/email-header";
import { Img } from "@react-email/components";

interface TwoFAMailProps {
  name: string;
  code: string;
}

const TwoFAMail = ({ name, code }: TwoFAMailProps) => {
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
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
            textAlign: "left",
          }}
        >
          Dear {name}!
        </h1>
        <div
          style={{
            backgroundColor: "#fff",

            textAlign: "center",
            display: "inline-block",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#555",
              marginBottom: "10px",
            }}
          >
            Your Two-Factor Authentication Code
          </h2>
          <div
            style={{
              background: "#264d25",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              display: "inline-block",
            }}
          >
            {code}
          </div>
          <p style={{ fontSize: "16px", marginTop: "20px", color: "#666" }}>
            If you did not request this code, please ignore this email or
            contact our support team.
          </p>
        </div>
      </div>

      {/* Footer */}
      <EmailFooter />
    </div>
  );
};

export default TwoFAMail;
