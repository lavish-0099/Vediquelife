import { Img } from "@react-email/components";

interface EmailHeaderProps {
  domain: string;
}

export const EmailHeader = ({ domain }: EmailHeaderProps) => {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        background: "#ffffff",
        border: "1px solid #264d25",
        padding: "5px 20px",
        textAlign: "center",
      }}
    >
      <a href={domain} style={{ textDecoration: "none" }}>
        <Img
          src="https://nutriwel-vedique.s3.ap-south-1.amazonaws.com/others/vedique-logo.png"
          alt="Vedique Logo"
          width={180}
          height={50}
          style={{ margin: "0px auto" }}
        />
      </a>
    </div>
  );
};
