import React from "react";

const Answer = [
  {
    answer: "Let",
    isCorrect: false,
  },
  {
    answer: "Async",
    isCorrect: false,
  },
  {
    answer: "Const",
    isCorrect: false,
  },
  {
    answer: "Var",
    isCorrect: false,
  },
  
]


const QuizSection: React.FC = () => {
  return (
    <div className="bg-gray-100 w-full h-full p-6 rounded-md">
      <div className="flex flex-col  font-sans">
        <div className="flex flex-row w-full">
          <div className="w-1/2">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold">JavaScript Basic Quiz</h1>
              <h1 className="mt-6">Answer The Question Below</h1>
            </div>
          </div>
          <div className="w-1/2 text-end">
            <h2 className="text-2xl">Timer : 00:00:00</h2>
          </div>
        </div>

        <div className="flex flex-col">

          <div>
            <div className="flex justify-center mt-2">
              <img src="https://forum.nwoods.com/uploads/db3963/original/2X/e/ea8bc6988360ead92fa1419b3ffa8e937ad4c1ef.png" alt="Logo" className="rounded-xl"/>
            </div>
          </div>

          <div>
            <div className="flex mt-8 ml-28 mb-4 font-bold">
              <h1>Question 1:</h1>
            </div>
          </div>

          <div>
            <div className="flex ml-36 mt-2 font-bold">
              <h1>What is the correct syntax for referring to an external script called "xxx.js"?</h1>
            </div>
          </div>

          {
            Answer.map((item, index) => {
              return (
                <div className="flex flex-row ml-36">
                  <input type={"radio"} className="mr-2"/>
                  <button className=" text-black  py-2 px-4 rounded mr-4">{item.answer}</button>
                </div>
              )
            })
          }
        </div>

        <div>
          <div className="flex flex-row justify-end mt-8">
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-40">
              Previous
            </button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-40 ml-4">
              Next
            </button>
            {/* <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-40 ml-4">
              Submit
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSection;