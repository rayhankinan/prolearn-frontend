import React, {useState} from "react";

// const MENU_LIST = [
//     { text: "Home", href: "/" },
//     { text: "Course", href: "/course" },
//     { text: "Discussion", href: "/discussion" },
//     { text: "About Us", href: "/about" },
//   ];

const Navbar: React.FC = () => {
    return (
        <nav className="flex fixed w-full items-center justify-between flex-wrap bg-gray-300 p-6">
            <div className="flex items-center flex-shrink-0 mr-6">
                <span className="font-bold text-4xl tracking-tight">ProLearn</span>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto justify-end">
                <div className="text-xl lg:flex-end space-x-16 mr-16">
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-white">
                        Home
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-white mr-4">
                        Course
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-white mr-4">
                        Discussion
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-white mr-4">
                        About Us
                    </a>
                </div>
                <div className="mr-10">
                    <a href="#" className="inline-block w-32 h-auto text-xl px-4 py-2 leading-none border rounded-full text-black bg-white mt-4 lg:mt-0 mr-12 ml-10 text-center align-middle">Login</a>
                    <a href="#" className="inline-block w-32 h-auto text-xl px-4 py-2 leading-none border rounded-full text-black bg-gray-400 mt-4 lg:mt-0 mr-5 text-center align-middle">Register</a>

                </div>
            </div>
        </nav>

        // <div className="w-full h-auto bg-gray-300" >
        //     <h2 className="font-sans p-3 text-4xl font-bold"> ProLearn </h2>
        //     <div className="flex flex-row justify-center">
                

                
        //     </div>

                        
        // </div>
    );
};

export default Navbar;