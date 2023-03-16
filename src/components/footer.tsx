import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="w-full h-auto flex flex-col bg-gray-600" >
      <div className="flex flex-row w-full justify-start"></div>
      <div className="flex flex-row w-full items-center p-12">
        <div className="flex flex-col w-full items-center">
          <img src="../logo.png" alt="Logo" className="bg-cover"/>
          <p className="font-sans p-3 text-xl font-bold text-white"> 
            Become a Professional Starts Here 
          </p>
          <div className="flex flex-row w-full justify-center">
            <input type="text" className="w-1/2 h-12 rounded-l-lg 
            border-2 border-gray-400 placeholder: pl-[14px]" 
            placeholder="Enter your email address" />
            <button className="w-1/6 h-12 rounded-r-lg bg-gray-400 text-white"> 
              Contact Us 
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full justify-items-end">
          <div className="flex flex-row w-full justify-middle">
            <i className="fa fa-map-marker fa-2x pt-3 pl-3" aria-hidden="true"></i>
            <h2 className="font-sans ml-4 p-3 text-xl font-bold text-white mr-32"> 
              Ganesha 10, Bandung, Kota Bandung, Jawa Barat. 
            </h2>
          </div>
          <div className="flex flex-row w-full justify-middle">
            <i className="fa fa-phone fa-2x pt-3 pl-3 mt-10" aria-hidden="true"></i>
            <h2 className="font-sans ml-4 p-3 text-xl font-bold text-white mr-32 mt-10">
              +62 812 3456 7890 
            </h2>
          </div>
        </div>    
      </div>
      <div className="flex flex-row w-full justify-start pb-8 mb-2">
        <div className="flex flex-row w-full items-center pl-40">
          <a href="#" className="font-sans p-3 text-l font-bold text-white"> About Us </a>
          <a href="#" className="font-sans p-3 text-l font-bold text-white"> Terms and Conditions </a>
          <a href="#" className="font-sans p-3 text-l font-bold text-white"> Privacy Policy </a>
          <a href="#" className="font-sans p-3 text-l font-bold text-white"> Contact Us </a>
          <a href="#" className="font-sans p-3 text-l font-bold text-white"> FAQ </a>
        </div>
        <div className="flex flex-row w-full justify-end pr-32">
          <p className="font-sans p-3 text-m font-bold text-white"> Copyright 2023 ProLearn Education </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;