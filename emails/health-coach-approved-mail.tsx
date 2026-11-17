// components/emails/health-coach-approved-mail.tsx
import { EmailFooter } from "@/components/emails/email-footer";
import { EmailHeader } from "@/components/emails/email-header";

interface HealthCoachApprovedMailProps {
  name: string;
  id: string;
}

const HealthCoachApprovedMail = ({
  name,
  id,
}: HealthCoachApprovedMailProps) => {
  const domain = process.env.NEXT_PUBLIC_APP_URL;
  const healthCoachLink = `${domain}/profile/${id}`;
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
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
          Congratulations {name}!
        </h1>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "500",
            marginTop: "10px",
            color: "#555",
          }}
        >
          Your Nutrition Coach Profile Has Been Approved and Live on Vedique
          Health Coach Network.
        </h2>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          We’re excited to welcome you to the Nutrition Coach Network at Ranfort
          Wellness! Your profile has been reviewed and approved by our team.
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          Your coach profile is now live on our website and visible to users
          seeking holistic wellness guidance.
        </p>
        <p style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}>
          If you’d like to review your profile or make changes, You can visit
          your profile here:
        </p>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <a
            href={healthCoachLink}
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
            View My Profile
          </a>
        </div>
        <p style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}>
          If you have any questions, feel free to contact us at{" "}
          <a
            href="mailto:info@vedique.life"
            style={{ color: "#ff8c00", textDecoration: "underline" }}
          >
            info@vedique.life
          </a>
          .
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
            Warm regards,
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

export default HealthCoachApprovedMail;
