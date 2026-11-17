import { EmailFooter } from "@/components/emails/email-footer";
import { EmailHeader } from "@/components/emails/email-header";
import { Img } from "@react-email/components"; // Ensure Img component is correctly imported

interface WelcomeSocialLoginMailProps {
  name: string;
  forcePasswordReset?: boolean;
}

const WelcomeSocialLoginMail = ({
  name,
  forcePasswordReset,
}: WelcomeSocialLoginMailProps) => {
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
          Welcome, {name}!
        </h1>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "500",
            marginTop: "10px",
            color: "#555",
          }}
        >
          We&apos;re Excited to Have You Here
        </h2>
        <p style={{ fontSize: "16px", color: "#666" }}>
          You now have access to personalized meal plans, exclusive premium
          programs, and a curated range of Vedique wellness products — all
          designed to support your holistic health journey.
        </p>
        {forcePasswordReset && (
          <p style={{ fontSize: "16px", color: "#b22222", marginTop: "20px" }}>
            For your security, please set a password by clicking the link below:
            <br />
            <a
              href={`${domain}/reset-password?firstTime=true`}
              style={{
                display: "inline-block",
                padding: "10px 20px",
                background: "linear-gradient(to right, #e12809, #e12809)",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Set your password
            </a>
          </p>
        )}

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

export default WelcomeSocialLoginMail;
