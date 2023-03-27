import React, { useState } from "react";

type qContent = {
  id: number;
  content: {
    title: string;
    questions: [
        {
            options: [
                {
                    content: string;
                    isCorrect: boolean;
                }
            ],
            content: string;
        }
    ]
    description: string;
  }
}

interface QuizSectionProps {
  quizContent: qContent;
}

const QuizSectionAdm: React.FC<QuizSectionProps> = ({ quizContent }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);

  const handleNextClick = () => {
    // setCurrentQuestion((prev) => prev + 1);
    if (currentQuestion < quizContent.content.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleFinishClick();
    }
  };

  const handlePrevClick = () => {
    setCurrentQuestion((prev) => prev - 1);
  };
  
  const handleFinishClick = () => {
    // const numCorrect = quizContent.reduce(
    //   (acc, { answer }, index) =>
    //     acc + (answer === QuestionAndAnswer[index].selectedAnswer ? 1 : 0),
    //   0
    // );
    // setNumCorrectAnswers(numCorrect);
    setShowModal(true);
  };

  const handleCloseModalClick = () => {
    setShowModal(false);
  };

  const isLastQuestion = currentQuestion === quizContent.content.questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  return (
    <div className="bg-gray-100 w-full h-full p-6 rounded-md">
      <div className="flex flex-col font-sans">
        <div className="flex flex-row w-full">
          <div className="w-2/3">
            <div className="flex flex-col">
              <div className="flex flex-row">
                <h1 className="text-4xl font-bold">{quizContent.content.title}</h1>
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 ml-6 flex justify-center">
                  <i className="fas fa-edit" style={{paddingTop: "3px"}}></i>
                </button>
              </div>
              <h1 className="mt-6">Answer The Question Below</h1>
            </div>
          </div>
          <div className="w-1/3 text-end">
            <h2 className="text-2xl">Timer : 00:00:00</h2>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <div>
            <div className="flex justify-center mt-2 mb-10">
              <img src="https://forum.nwoods.com/uploads/db3963/original/2X/e/ea8bc6988360ead92fa1419b3ffa8e937ad4c1ef.png" alt="Logo" className="rounded-xl"/>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/2 flex flex-row">
              <h1 className="text-2xl font-bold">Question {currentQuestion + 1}</h1>
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 ml-6 flex justify-center">
                <i className="fas fa-edit"></i>
                </button>
            </div>
            <div className="w-1/2 text-end">
              <h1 className="text-2xl font-bold">
                {currentQuestion + 1} / {quizContent.content.questions.length}
              </h1>
            </div>
          </div>
          <div className="flex flex-col mt-6">
            {/* <h1 className="text-2xl font-bold">{quizContent.content.questions[currentQuestion].content}</h1> */}
            <h1 className="text-2xl font-bold" dangerouslySetInnerHTML={{ __html: quizContent.content.questions[currentQuestion].content }}></h1>
            <div className="flex flex-col mt-6">
              {quizContent.content.questions[currentQuestion].options.map((answer, index) => (
                <div className="flex flex-row mt-4">
                    <div className="flex w-1/6 ">
                        <div className="">
                            <button className="bg-blue-500 text-white mr-2 font-bold py-2 px-4 rounded hover:bg-blue-700">
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700">
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div className="w-5/6" style={{paddingTop: "4px"}}>
                        <label htmlFor={`answer${index}`}>{answer.content}</label>
                    </div>
                </div>
              ))}
              <div>
                <div className="flex flex-row mt-6">
                  <div className="w-1/2">
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                      Add Option
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row mt-12 mb-4">
          <div className="w-1/2">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
              Add Question
            </button>
          </div>
          <div className="w-1/2 text-end">
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700">
              Delete Question
            </button>
          </div>
        </div>


        <div className="flex flex-row mt-12 mb-10">
          {!isFirstQuestion && (
            <div className="w-1/2">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                onClick={handlePrevClick}
              >
                Prev
              </button>
            </div>
          )}
          <div className="w-1/2 text-end">
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              onClick={handleNextClick}
            >
              {isLastQuestion ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
      {
        showModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/2 h-1/2 rounded-md flex flex-col justify-center items-center">
              <img src="../../prize.png" alt="prize" className="w-40 h-40 mb-12" />
              <h1 className="text-2xl font-bold">Horay</h1>
              <h1 className="text-2xl font-bold mt-4">You have finished editing the quiz</h1>
              <div className="flex flex-row mt-12 justify-between">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-4 mr-4"
                  onClick={handleCloseModalClick}
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-4 ml-4"
                  // onClick={handleCloseModalClick}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};


export default QuizSectionAdm;
