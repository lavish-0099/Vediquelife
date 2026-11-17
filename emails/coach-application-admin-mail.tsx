import { EmailFooter } from "@/components/emails/email-footer";
import { EmailHeader } from "@/components/emails/email-header";

interface CoachApplicationAdminMailProps {
  nutritionCoachId: string;
  name: string;
  email: string;
  phoneNumber: string;
  experience: string;
  qualification: string;
  location: string;
  timestamp: string;
}

const CoachApplicationAdminMail = ({
  nutritionCoachId,
  name,
  email,
  phoneNumber,
  experience,
  qualification,
  location,
  timestamp,
}: CoachApplicationAdminMailProps) => {
  const domain = process.env.NEXT_PUBLIC_APP_URL;

  const adminReviewLink = `${domain}/admin/nutrition-coaches/${nutritionCoachId}`;

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
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
          New Nutrition Coach Application Submitted
        </h1>

        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#555" }}>
          A new application has been submitted to join the Nutrition Coach
          Network. Please review the details below and take appropriate action.
        </p>

        <p style={{ fontSize: "16px", marginBottom: "8px", color: "#666" }}>
          <strong>Name:</strong> {name}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "8px", color: "#666" }}>
          <strong>Email:</strong> {email}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "8px", color: "#666" }}>
          <strong>Phone Number:</strong> {phoneNumber}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "8px", color: "#666" }}>
          <strong>Experience:</strong> {experience}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "8px", color: "#666" }}>
          <strong>Qualification:</strong> {qualification}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "8px", color: "#666" }}>
          <strong>Location:</strong> {location}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px", color: "#666" }}>
          <strong>Submitted At:</strong> {timestamp}
        </p>

        {/* Review Button */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <a
            href={adminReviewLink}
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
            Review Application
          </a>
        </div>
      </div>

      {/* Footer */}
      <EmailFooter />
    </div>
  );
};

export default CoachApplicationAdminMail;
