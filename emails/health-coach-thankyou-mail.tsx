import { EmailFooter } from "@/components/emails/email-footer";
import { EmailHeader } from "@/components/emails/email-header";
interface HealthCoachThankyouMailProps {
  name: string;
}

const HealthCoachThankyouMail = ({ name }: HealthCoachThankyouMailProps) => {
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
          Thank you for applying to join our Nutrition Coach Network.
        </h2>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          We have received your application and it is currently under review by
          our team. Once your application is approved, your profile will be made
          visible in our Health Coach Network and you will be notified via
          email.
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          We appreciate your interest in being part of our community dedicated
          to holistic wellness. Our team will reach out in case any additional
          information is required.
        </p>

        <p style={{ fontSize: "16px", color: "#555", marginBottom: "16px" }}>
          If you have any questions or wish to provide more details, feel free
          to contact us at{" "}
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

export default HealthCoachThankyouMail;
