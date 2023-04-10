// Create About Us Page

import React from "react";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Swiper from "swiper";
import { AuthContext } from "@/contexts/AuthContext";
import "swiper/swiper-bundle.css";

const ourTeam = [
  {
    name: "Rizky Akbar Asmaran",
    role: "Frontend Developer",
    image: "../test-team.png",
  },
  {
    name: "Azka Syauqi Irsyad",
    role: "Backend Developer",
    image: "../test-team.png",
  },
  {
    name: "Aira Thalca Avila Putra",
    role: "Backend Developer",
    image: "../test-team.png",
  },
  {
    name: "Rayhan Kinan Muhannad",
    role: "Backend Developer",
    image: "../test-team.png",
  },
  {
    name: "Andhika Arta Aryanto",
    role: "Frontend Developer",
    image: "../test-team.png",
  },
  {
    name: "Louis Yanggara",
    role: "Frontend Developer",
    image: "../test-team.png",
  },
];

const AboutUs = () => {
  const [_, setSwiper] = useState<Swiper | null>(null);
  const { isLoggedIn } = React.useContext(AuthContext);

  useEffect(() => {
    const newSwiper = new Swiper(".swiper-container", {
      slidesPerView: 3,
      spaceBetween: 10,
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      autoplay: {
        disableOnInteraction: false,
      },
    });
    setSwiper(newSwiper);
  }, []);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="text-center mt-10 font-mono">
        <h1 className="text-6xl font-bold ">ProLearn</h1>
        <h2 className="text-4xl mt-10">We're Here to to</h2>
        <h2 className="text-4xl underline">Create a Professional</h2>
      </div>

      <div className="flex rounded-xl bg-blue-500 ml-40 mr-40 mt-10">
        <div className="p-10 text-white text-3xl font-bold font-mono">
          ProLearn is a website that provides online courses for skills
          development and career advancement in fields such as technology,
          business, creativity and more. This website offers a wide range of
          online courses presented by experts in the field, and can be accessed
          by anyone from all over the world with an internet connection.
        </div>
      </div>
      <div className="flex justify-center h-auto">
        <img src="../bg-aboutUs.png" alt="aboutus" />
      </div>

      <div>
        <h1 className="text-6xl font-bold text-center mt-10 font-mono mb-6">
          Our Team
        </h1>
      </div>

      <div className="swiper-container mb-20 m-10">
        <div className="swiper-wrapper">
          {ourTeam.map((team, index) => (
            <div
              key={index}
              className="swiper-slide flex flex-col items-center"
            >
              <img src={team.image} alt="team" className="rounded-lg" />
              <h1 className="text-2xl font-bold mt-5">{team.name}</h1>
              <h1 className="text-xl mt-2">{team.role}</h1>
            </div>
          ))}
        </div>
      </div>

      <div className="pl-10">
        <h1 className="text-6xl font-bold mt-10 font-mono">Our Mission</h1>
        <div className="border w-1/2 border-black border-4"></div>
        <div className="flex flex-col mt-10 text-xl">
          <div className="flex flex-row">
            <h1 className="font-bold">Unmatched</h1>
            <h1 className="ml-40 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quae
              exercitationem voluptatem fugiat voluptatibus necessitatibus in
              minus placeat dolores tempore id qui magni eveniet voluptas
              aliquid, amet ipsum laudantium saepe.
            </h1>
          </div>
          <div className="flex flex-row mt-10">
            <h1 className="font-bold">Unmatched</h1>
            <h1 className="ml-40 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quae
              exercitationem voluptatem fugiat voluptatibus necessitatibus in
              minus placeat dolores tempore id qui magni eveniet voluptas
              aliquid, amet ipsum laudantium saepe.
            </h1>
          </div>
          <div className="flex flex-row mt-10">
            <h1 className="font-bold">Unmatched</h1>
            <h1 className="ml-40 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quae
              exercitationem voluptatem fugiat voluptatibus necessitatibus in
              minus placeat dolores tempore id qui magni eveniet voluptas
              aliquid, amet ipsum laudantium saepe.
            </h1>
          </div>
          <div className="flex flex-row mt-10">
            <h1 className="font-bold">Unmatched</h1>
            <h1 className="ml-40 font-light">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quae
              exercitationem voluptatem fugiat voluptatibus necessitatibus in
              minus placeat dolores tempore id qui magni eveniet voluptas
              aliquid, amet ipsum laudantium saepe.
            </h1>
          </div>
        </div>
      </div>

      <div className="mt-28 mb-14">
        <h1 className="text-6xl font-bold text-center mt-10 font-mono">
          Get In Touch
        </h1>
        <h2 className="text-xl font-bold text-center mt-2 font-mono">
          We'd love to hear from you. Please fill out this form.
        </h2>
        <div className="flex justify-center">
          <div className="flex flex-col mt-10">
            <div className="flex flex-row">
              <div className="flex flex-col mr-10">
                <h1 className="font-bold">Name</h1>
                <input
                  type="text"
                  className="border-2 border-black rounded-lg mt-2 w-96 h-10 placeholder:text-gray-500 pl-[14px]"
                  placeholder="John Doe"
                />

                <h1 className="font-bold mt-5">Email</h1>
                <input
                  type="text"
                  className="border-2 border-black rounded-lg mt-2 w-96 h-10 placeholder:text-gray-500 pl-[14px]"
                  placeholder="iloveyourmom@gmail.com"
                />

                <h1 className="font-bold mt-5">Subject</h1>
                <input
                  type="text"
                  className="border-2 border-black rounded-lg mt-2 w-96 h-10 placeholder:text-gray-500 pl-[14px]"
                  placeholder="Complaint"
                />

                <h1 className="font-bold mt-5">Message</h1>
                <input
                  type="text"
                  className="border-2 border-black rounded-lg mt-2 w-96 h-10 placeholder:text-gray-500 pl-[14px]"
                  placeholder="Text Message"
                />

                <button className="bg-black text-white font-bold mt-5 w-96 h-10 rounded-lg">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
