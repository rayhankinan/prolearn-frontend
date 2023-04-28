import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaLocationArrow } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="w-full h-fit flex flex-col bg-gray-600">
      <div className="flex flex-row w-full justify-start"></div>
      <div className="flex flex-row w-full items-center p-10">
        <div className="flex flex-col w-full items-center">
          <img src="../logo.png" alt="Logo" className="bg-cover" />
          <p className="font-sans p-3 text-xl font-bold text-white">
            Become a Professional Starts Here
          </p>
          <div className="flex flex-col w-full items-center mt-2">
            <h2 className="font-sans text-xl font-bold text-white">
              Our Social Media
            </h2>
            <div className="flex flex-row w-full justify-center items-center mt-4">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                <FaFacebook className="text-white mx-2 hover:text-blue-500" size={24} />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <FaTwitter className="text-white mx-2 hover:text-blue-500" size={24} />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                <FaLinkedin className="text-white mx-2 hover:text-blue-500" size={24} />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                <FaInstagram className="text-white mx-2 hover:text-blue-500" size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full justify-items-end">
          <div className="flex flex-row w-full items-center">
            <FaLocationArrow className="text-white mr-2" size={24} />
            <h2 className="font-sans p-3 text-xl font-bold text-white">
              Ganesha 10, Bandung, Kota Bandung, Jawa Barat.
            </h2>
          </div>
          <div className="flex flex-row w-full items-center">
            <FaPhone className="text-white mr-2" size={24} />
            <h2 className="font-sans p-3 text-xl font-bold text-white">
              +62 895 0764 6369
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start pb-4 mb-2">
        <div className="flex flex-row w-full items-center pl-40">
        </div>
        <div className="flex flex-row w-full justify-end pr-32">
          <p className="font-sans p-3 text-m font-bold text-white">
            {" "}
            © 2023 ProLearn Education. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
