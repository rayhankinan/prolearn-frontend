import React, { useState } from "react";

const QuestionAndAnswer = [
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    answer: [
      {
        content: "script src='xxx.js'",
        isCorrect: false,
      },
      {
        content: "script href='xxx.js'",
        isCorrect: false,
      },
      {
        content: "script name='xxx.js'",
        isCorrect: false,
      },
      {
        content: "script src='xxx.js'",
        isCorrect: true,
      },
    ],
    description: "The src attribute specifies the URL of an external script file.",
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answer: [
      {
        content: "alertBox('Hello World');",
        isCorrect: false,
      },
      {
        content: "msg('Hello World');",
        isCorrect: false,
      },
      {
        content: "alert('Hello World');",
        isCorrect: true,
      },
      {
        content: "msgBox('Hello World');",
        isCorrect: false,
      },
    ],
    description: "The src attribute specifies the URL of an external script file.",
  },
  {
    question: "How do you create a function in JavaScript?",
    answer: [
      {
        content: "function:myFunction()",
        isCorrect: false,
      },
      {
        content: "function = myFunction()",
        isCorrect: false,
      },
      {
        content: "function myFunction()",
        isCorrect: true,
      },
      {
        content: "function myFunction()",
        isCorrect: false,
      },
    ],
    description: "The src attribute specifies the URL of an external script file.",
  }
];

type qContent = {
  title: string;
  question: [
      {
          option: [
              {
                  content: string;
                  isCorrect: boolean;
              }
          ]
      }
  ]
  description: string;
};

interface QuizSectionProps {
  quizContent: qContent;
}

const QuizSection: React.FC<QuizSectionProps> = ({ quizContent }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNextClick = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const isLastQuestion = currentQuestion === QuestionAndAnswer.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  return (
    <div className="bg-gray-100 w-full h-full p-6 rounded-md">
      <div className="flex flex-col font-sans">
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

        <div className="flex flex-col mt-6">
          <div>
            <div className="flex justify-center mt-2 mb-10">
              <img src="https://forum.nwoods.com/uploads/db3963/original/2X/e/ea8bc6988360ead92fa1419b3ffa8e937ad4c1ef.png" alt="Logo" className="rounded-xl"/>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/2">
              <h1 className="text-2xl font-bold">Question {currentQuestion + 1}</h1>
            </div>
            <div className="w-1/2 text-end">
              <h1 className="text-2xl font-bold">
                {currentQuestion + 1} / {QuestionAndAnswer.length}
              </h1>
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <h1 className="text-2xl font-bold">{QuestionAndAnswer[currentQuestion].question}</h1>
            <div className="flex flex-col mt-6">
              {QuestionAndAnswer[currentQuestion].answer.map((answer, index) => (
                <div className="flex flex-row mt-4">
                  <div className="w-1/12">
                    <input type="radio" name="answer" id={`answer${index}`} />
                  </div>
                  <div className="w-11/12">
                    <label htmlFor={`answer${index}`}>{answer.content}</label>
                  </div>
                </div>
              ))}
            </div>
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
    </div>
  );
};


export default QuizSection;
