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
    <div className="w-full bg-[#699D99] h-[432px] text-white flex flex-col py-10 px-25 gap-11">
      <div className="w-[1240px] h-[287px] museo flex flex-row gap-60 ">
        {/* Logo & Description */}
        <div className="w-[360px] flex flex-col gap-8">
          <div className="w-[253px] h-[107px]">
            {/* Icon */}
            <Image src={"/img/image.png"} alt="logo" width={254} height={101} />
          </div>
          <p className="h-22 w-[360px] text-base font-light leading-[22px] mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex space-x-4">
            <a href="#">
              <FontAwesomeIcon icon={faFacebookF} className="w-8 h-8" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} className="w-8 h-8" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faYoutube} className="w-8 h-8" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} className="w-8 h-8" />
            </a>
          </div>
        </div>
        {/* Links */}
        <div className="h-[196px] w-[657px] flex flex-row gap-30">
          <div className="w-[179px] flex flex-col gap-7">
            <h3 className="font-semibold text-xl leading-7">Product</h3>
            <ul className="w-36 h-35 flex flex-col gap-5 text-base font-light leading-5">
              <li>
                <a href="#">Examples</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Funeral directors</a>
              </li>
              <li>
                <a href="#">Flower wreaths</a>
              </li>
            </ul>
          </div>
          <div className="w-[179px] flex flex-col gap-7">
            <h3 className="font-semibold text-xl leading-7">Help</h3>
            <ul className="w-36 h-35 flex flex-col gap-5 text-base font-light leading-5">
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div className="w-[179px] flex flex-col gap-7">
            <h3 className="font-semibold text-xl leading-7">Company</h3>
            <ul className="w-36 h-35 flex flex-col gap-5 text-base font-light leading-5">
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Partner with us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center font-light text-[14px] text-white/80 ">
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
