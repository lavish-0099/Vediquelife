import { Img } from "@react-email/components";

const socialLinks = [
  {
    href: "https://www.facebook.com/Dr.ShikhasNutriHealth",
    src: "https://nutriwel-vedique.s3.ap-south-1.amazonaws.com/others/facebook.png",
    alt: "Facebook",
  },
  {
    href: "https://twitter.com/nutrihealthsys",
    src: "https://nutriwel-vedique.s3.ap-south-1.amazonaws.com/others/x-icon.png",
    alt: "Twitter",
  },
  {
    href: "https://www.instagram.com/nutrihealthsystems/",
    src: "https://nutriwel-vedique.s3.ap-south-1.amazonaws.com/others/social.png",
    alt: "Instagram",
  },
  {
    href: "https://www.youtube.com/@DrShikhasOneHealth",
    src: "https://nutriwel-vedique.s3.ap-south-1.amazonaws.com/others/youtube.png",
    alt: "YouTube",
  },
  {
    href: "https://www.linkedin.com/in/dr-shikha-sharma-s-onehealth-085a8733/",
    src: "https://nutriwel-vedique.s3.ap-south-1.amazonaws.com/others/linkedin.png",
    alt: "LinkedIn",
  },
];

export const EmailSocial = () => {
  return (
    <>
      <h2
        style={{
          fontSize: "20px",
          textAlign: "center",
          fontWeight: "bold",
          color: "#264d25",
        }}
      >
        Follow Us
      </h2>
      <table
        style={{
          margin: "0 auto",
        }}
      >
        <tr>
          {socialLinks.map((link, index) => (
            <td key={index}>
              <a
                href={link.href}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <Img
                  src={link.src}
                  alt={link.alt}
                  width={24}
                  height={24}
                  style={{ marginRight: "5px" }}
                />
              </a>
            </td>
          ))}
        </tr>
      </table>
    </>
  );
};
