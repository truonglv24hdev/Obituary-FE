import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="w-full bg-[#699D99] text-white flex flex-col py-10 px-6 md:px-25 gap-11">
      <div className="max-w-[1240px] mx-auto museo flex flex-col md:flex-row gap-10 md:gap-[140px]">
        {/* Logo & Description */}
        <div className="w-full md:w-[360px] flex flex-col gap-8">
          <div className="w-[253px] h-[107px]">
            <Image src={"/img/image.png"} alt="logo" width={254} height={101} />
          </div>
          <p className="text-[16px] md:text-[18px] font-light leading-[22px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex gap-5 text-[24px] md:text-[28px]">
            <a href="#">
              <FontAwesomeIcon
                icon={faFacebookF}
                className="h-6 w-6 md:h-7 md:w-7"
              />
            </a>
            <a href="#">
              <FontAwesomeIcon
                icon={faTwitter}
                className="h-6 w-6 md:h-7 md:w-7"
              />
            </a>
            <a href="#">
              <FontAwesomeIcon
                icon={faYoutube}
                className="h-6 w-6 md:h-7 md:w-7"
              />
            </a>
            <a href="#">
              <FontAwesomeIcon
                icon={faInstagram}
                className="h-6 w-6 md:h-7 md:w-7"
              />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="w-full md:w-[657px] flex flex-col md:flex-row gap-10 md:gap-15">
          {[
            {
              title: "Product",
              links: [
                "Examples",
                "Pricing",
                "Funeral directors",
                "Flower wreaths",
              ],
            },
            { title: "Help", links: ["Contact us", "FAQs", "Blog"] },
            { title: "Company", links: ["About us", "Partner with us"] },
          ].map((section, idx) => (
            <div key={idx} className="w-full md:w-[179px] flex flex-col gap-7">
              <h3 className="font-semibold text-xl leading-7">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-5 text-base font-light leading-5">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-center font-light museo text-[14px] text-white/80 w-full px-4 md:w-[507px] mx-auto">
        Copyright © Les Prestataires. All Rights Reserved. |{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="#" className="underline">
          Terms of Use
        </a>
      </div>
    </div>
  );
};

export default Footer;
