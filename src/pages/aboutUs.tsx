import React from "react";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Swiper from "swiper";
import { AuthContext } from "@/contexts/AuthContext";
import "swiper/swiper-bundle.css";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const ourTeam = [
  {
    name: "Rizky Akbar Asmaran",
    role: "Frontend Developer",
    image: "../kibar.jpeg",
  },
  {
    name: "Azka Syauqy Irsyad",
    role: "Backend Developer",
    image: "../azka.jpg",
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
      slidesPerGroup: 2,
      grabCursor: true,
      effect: "coverflow",
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

      <div className="swiper-container mb-20 mt-14 pl-32 overflow-x-hidden">
        <div className="swiper-wrapper">
          {ourTeam.map((team, index) => (
            <div
              key={index}
              className="swiper-slide flex flex-col items-center"
            >
              <img src={team.image} alt="team" className="rounded-lg" style={{ width: '400px', height: '550px' }} />
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
          <div className="flex flex-row justify-between">
            <h1 className="font-bold w-16">Accessibility</h1>
            <p className="ml-40 font-light text-justify pr-10">
              Our platform is committed to making education accessible to learners of all backgrounds and abilities. We strive 
              to remove barriers to learning by providing flexible and inclusive educational resources that
               meet the diverse needs of our learners.
            </p>
          </div>
          <div className="flex flex-row justify-between mt-5">
            <h1 className="font-bold w-16">Innovation</h1>
            <p className="ml-40 font-light text-justify pr-10">
              We believe in staying at the forefront of educational technology and pedagogy. Our platform leverages the latest tools and techniques to create innovative and engaging learning experiences that empower our learners to achieve their full potential.
            </p>
          </div>
          <div className="flex flex-row justify-between mt-5">
            <h1 className="font-bold w-16">Quality</h1>
            <p className="ml-40 font-light text-justify pr-10">
              We are dedicated to providing high-quality educational content and resources to our learners. Our platform is committed to ensuring that our courses are designed and taught by subject matter experts, and that our content is up-to-date, accurate, and relevant. We are constantly monitoring and evaluating our courses to ensure that they meet the highest standards of quality and effectiveness. Our aim is to provide our learners with the knowledge and skills they need to succeed in their personal and professional lives.
            </p>
          </div>
          <div className="flex flex-row justify-between mt-5">
            <h1 className="font-bold w-16">Student Success</h1>
            <p className="ml-40 font-light text-justify pr-10">
              Our ultimate goal is to help learners achieve their educational and career objectives. We provide personalized learning pathways, feedback, and support to help learners stay motivated and achieve success. We measure our success by the success of our learners.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-28 mb-14">
        <h1 className="text-6xl font-bold text-center mt-10 font-mono">
          Contact Info
        </h1>
        <h2 className="text-xl font-bold text-center mt-2 font-mono">
          We'd love to hear from you. Please Contact Us With Our Social Media
        </h2>
        <div className="flex justify-center">
          <div className="flex flex-col mt-10">
            <div className="flex flex-row">
              <div className="flex flex-col mr-10">
                <div className="flex">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="mr-12"
                  >
                    <FaFacebook size={60} />
                  </a>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="mr-12"
                  >
                    <FaTwitter size={60} />
                  </a>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="mr-12"
                  >
                    <FaLinkedin size={60} />
                  </a>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram size={60} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
