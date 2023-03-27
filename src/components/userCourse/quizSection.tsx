import React, { useState } from "react";
import quizService from "@/services/quiz-service";

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

let listOfAnswers: number[] = [];

const QuizSection: React.FC<QuizSectionProps> = ({ quizContent }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [indexAnswer, setIndexAnswer] = useState<number | null>(null);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);

  const handleAnswerClick = (index: number) => {
    setIndexAnswer(index);
    listOfAnswers[currentQuestion] = index;
  }

  const handleNextClick = () => {
    // setCurrentQuestion((prev) => prev + 1);
    if (currentQuestion < quizContent.content.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setIndexAnswer(null);
    } else {
      handleFinishClick();
    }
    console.log(listOfAnswers);
  };

  const handlePrevClick = () => {
    setCurrentQuestion((prev) => prev - 1);
  };
  
  const handleFinishClick = () => {
    const sendQuizReq = {
      quizId: quizContent.id,
      answer: listOfAnswers,
    }

    console.log(sendQuizReq);
    quizService.submitQuiz(sendQuizReq)
      .then((response) => {
        console.log(response.data);
        setNumCorrectAnswers(response.data.correct_answer);
      })
      .catch((error) => {
        console.log(error);
      });
    setShowModal(true);
  };

  const handleCloseModalClick = () => {
    setShowModal(false);
  };

  console.log(quizContent.content.questions.length);

  const isLastQuestion = currentQuestion === quizContent.content.questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  return (
    <div className="bg-gray-100 w-full h-full p-6 rounded-md">
      <div className="flex flex-col font-sans">
        <div className="flex flex-row w-full">
          <div className="w-1/2">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold">{quizContent.content.title}</h1>
              <h1 className="mt-6">Answer The Question Below</h1>
            </div>
          </div>
          <div className="w-1/2 text-end">
            <h2 className="text-2xl">Timer : 00:00:00</h2>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <div className="flex flex-row">
            <div className="w-1/2">
              <h1 className="text-2xl font-bold">Question {currentQuestion + 1}</h1>
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
                  <div className="w-1/12">
                    <input type="radio" name="answer" id={`answer${index}`} onClick={() => handleAnswerClick(index)} checked={indexAnswer === index} />
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
      {
        showModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/2 h-1/2 rounded-md flex flex-col justify-center items-center">
              <img src="../../prize.png" alt="prize" className="w-40 h-40 mb-12" />
              <h1 className="text-2xl font-bold">You have finished the quiz</h1>
              <h1 className="text-2xl font-bold mt-4">You got {numCorrectAnswers} out of {quizContent.content.questions.length} correct</h1>
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


export default QuizSection;
