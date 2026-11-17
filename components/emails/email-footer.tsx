import { EmailSocial } from "./email-social";

export const EmailFooter = () => {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        background: "#ffffff",
        padding: "20px",
        textAlign: "center",
        color: "#264d25",
        border: "1px solid #264d25",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} Ranfort Wellness Pvt Ltd. All rights
        reserved.
      </p>

      <EmailSocial />
    </div>
  );
};
