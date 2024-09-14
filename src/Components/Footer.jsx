import dhImage from "../assets/DH.png";
import dhImageLight from "../assets/DH-light.png";

import { useGlobalContext } from "../Context/global.context";

import icoInstagram from "../assets/ico-instagram.png";
import icoFacebook from "../assets/ico-facebook.png";
import icoTiktok from "../assets/ico-tiktok.png";
import icoWhatsapp from "../assets/ico-whatsapp.png";

import icoInstagramDark from "../assets/ico-instagram-Dark.png";
import icoFacebookDark from "../assets/ico-facebook-Dark.png";
import icoTiktokDark from "../assets/ico-tiktok-Dark.png";
import icoWhatsappDark from "../assets/ico-whatsapp-Dark.png";

const Footer = () => {
  const { theme } = useGlobalContext();

  const digital = {
    key: "digital",
    img: dhImageLight,
    imgDark: dhImage,
    alt: "Digital House icon",
    url: "https://www.digitalhouse.com/",
  };

  const socialMedia = [
    {
      key: "insta",
      img: icoFacebook,
      imgDark: icoFacebookDark,
      alt: "Facebook icon",
      url: "https://www.instagram.com/",
    },
    {
      key: "face",
      img: icoInstagram,
      imgDark: icoInstagramDark,
      alt: "Instagram icon",
      url: "https://www.facebook.com/",
    },
    {
      key: "tiktok",
      img: icoTiktok,
      imgDark: icoTiktokDark,
      alt: "TikTok icon",
      url: "https://www.tiktok.com/",
    },
    {
      key: "wsp",
      img: icoWhatsapp,
      imgDark: icoWhatsappDark,
      alt: "Whatsapp icon",
      url: "https://www.whatsapp.com/",
    },
  ];

  return (
    <footer className={`${theme === "dark" ? "dark-mode" : ""}`}>
      <div className="section">
        <p>Powered by</p>
        <a href={digital.url} className="digital">
          <img
            src={theme === "dark" ? digital.img : digital.imgDark}
            alt={digital.alt}
          />
        </a>
      </div>
      <div className="section">
        {socialMedia.map((item) => (
          <a href={item.url} key={item.key}>
            <img
              src={theme === "dark" ? item.img : item.imgDark}
              alt={item.alt}
            />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
