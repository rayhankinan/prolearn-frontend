import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="w-full h-auto flex flex-col bg-gray-600">
      <div className="flex flex-row w-full justify-start"></div>
      <div className="flex flex-row w-full items-center p-12">
        <div className="flex flex-col w-full items-center">
          <img src="../logo.png" alt="Logo" className="bg-cover" />
          <p className="font-sans p-3 text-xl font-bold text-white">
            Become a Professional Starts Here
          </p>
        </div>
        <div className="flex flex-col w-full justify-items-end">
          <div className="flex flex-row w-full justify-middle">
            <i
              className="fa fa-map-marker fa-2x pt-3 pl-3"
              aria-hidden="true"
            ></i>
            <h2 className="font-sans ml-4 p-3 text-xl font-bold text-white mr-32">
              Ganesha 10, Bandung, Kota Bandung, Jawa Barat.
            </h2>
          </div>
          <div className="flex flex-row w-full justify-middle">
            <i
              className="fa fa-phone fa-2x pt-3 pl-3 mt-10"
              aria-hidden="true"
            ></i>
            <h2 className="font-sans ml-4 p-3 text-xl font-bold text-white mr-32 mt-10">
              +62 895 0764 6369
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-start pb-8 mb-2">
        <div className="flex flex-row w-full items-center pl-40">
        </div>
        <div className="flex flex-row w-full justify-end pr-32">
          <p className="font-sans p-3 text-m font-bold text-white">
            {" "}
            Copyright 2023 ProLearn Education{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
