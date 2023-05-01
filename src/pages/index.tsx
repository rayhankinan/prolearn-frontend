import React, { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CourseService from "@/services/course-service";
import CategoryService from "@/services/category-service";
import Course from "@/interfaces/course-interface";
import Category from "@/interfaces/category-interface";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";

export default function CourseLanding() {
  const { isLoggedIn } = React.useContext(AuthContext);
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    CourseService.getAllForVisitor({
      page: 1,
      limit: 7,
    })
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    CategoryService.getAll()
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const [categorySelected, setCategorySelected] = useState<number[]>([]);
  const handleCategoryClicked = (id: number) => {
    setCategorySelected([id]);
  };

  const search = (categorySelected: number[] | undefined) => {
    CourseService.getAllForVisitor({
      page: 1,
      limit: 7,
      categoryId: categorySelected,
    })
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      search(categorySelected);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [categorySelected]);

  return (
    <div>
      {/* <Login_navbar />1 */}
      <Head>
        <title>ProLearn</title>
      </Head>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-center">
          <h1 className="font-sans text-6xl font-bold ml-24">
            {" "}
            Learn Everywhere Like a Professional
          </h1>
          <p className="font-sans text-2xl ml-24 mt-10 border-l-2 border-gray-400 p-4">
            A learning system based on formalised teaching with the help of
            resources.
          </p>
          <div className="flex flex-row justify-start ml-14 mt-10">
            <a
              href="/auth/register"
              className="inline-block w-auto h-16 text-xl px-4 py-5 
              leading-none border border-gray-300 shadow-xl text-black bg-white mt-4 lg:mt-0
              mr-12 ml-10 hover:transition ease-in-out hover:scale-110 duration-300"
            >
              Get Started
            </a>
            <a
              href="/aboutUs"
              className="inline-block w-auto h-16 text-xl px-4 py-5 leading-none 
              border border-gray-300 shadow-xl text-black bg-gray-400 mt-4 lg:mt-0 mr-5
              hover:transition ease-in-out hover:scale-110 duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="flex justify-end ">
          <img className="mt-10 mr-20" src="../stock_1.png" alt="Logo" />
        </div>
      </div>
      <div className="flex flex-row justify-between pb-20 pt-20 pr-20 bg-gray-400">
        <div className="flex flex-col">
          <h1 className="font-sans text-6xl font-bold ml-24">
            {" "}
            Why We Are The Best
          </h1>
          <p className="font-sans text-2xl ml-24 mt-10">
            A learning system based on formalised teaching with the help of
            resources.
          </p>
        </div>
        <div className="flex flex-col ml-14 mt-4">
          <img className="w-12 h-12 mb-8" src="../Frame 35.png" alt="Logo" />
          <h1 className="font-sans text-xl font-bold mb-4">Expert Teacher</h1>
          <p>
            Our teachers are experts in their field and have years of experience
            in teaching.
          </p>
        </div>
        <div className="flex flex-col ml-14 mt-4">
          <img className="w-12 h-12 mb-8" src="../Frame 36.png" alt="Logo" />
          <h1 className="font-sans text-xl font-bold mb-4">Online Courses</h1>
          <p>
            Our courses are available online and can be accessed from anywhere.
          </p>
        </div>
        <div className="flex flex-col ml-14 mt-4">
          <img className="w-12 h-12 mb-8" src="../Frame 37.png" alt="Logo" />
          <h1 className="font-sans text-xl font-bold mb-4">24/7 Support</h1>
          <p>
            Our support team is available 24/7 to help you with any issues you
            may have.
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-between pb-20 pt-20 pr-20">
        <div className="flex flex-col">
          <h1 className="font-sans text-6xl font-bold ml-24">
            {" "}
            Easy Learning with 20+ Language
          </h1>
          <p className="font-sans text-2xl ml-24 mt-10">
            Learning any programming language that you use daily and keep things
            on track.
          </p>
        </div>
        <div className="flex flex-col ml-14">
          <img src="../Logos.png" alt="Logo" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
