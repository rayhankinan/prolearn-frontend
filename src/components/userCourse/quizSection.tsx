import React, { useState } from "react";
import quizService from "@/services/quiz-service";
import Quiz from "@/interfaces/quiz-interface";
import Button from "@mui/material/Button";

interface QuizSectionProps {
  quizContent: Quiz;
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
  };

  const handleNextClick = () => {
    if (currentQuestion < quizContent.content.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setIndexAnswer(null);
    } else {
      handleFinishClick();
    }
  };

  const handlePrevClick = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleFinishClick = () => {
    const sendQuizReq = {
      answer: listOfAnswers,
    };

    quizService
      .submitQuiz(quizContent.id, sendQuizReq)
      .then((response) => {
        setNumCorrectAnswers(response.data.correctAnswers);
      })
      .catch((error) => {
        console.log(error);
      });
    setShowModal(true);
  };

  const handleCloseModalClick = () => {
    setShowModal(false);
    window.location.reload();
  };

  const isLastQuestion =
    currentQuestion === quizContent.content.questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  return (
    <div className="w-3/4 h-full p-4 shadow-lg bg-gray-200 rounded-md m-auto">
      <div className="flex flex-col font-sans">
        <div className="flex flex-row w-full">
          <div className="w-full">
            <div className="flex flex-col">
              <div className="text-2xl font-bold flex justify-center">
                {quizContent.content.title}
              </div>
              <div className="flex flex-row">
                <div className="w-1/2">
                  <div className="mt-3 text-sm">Answer the Question Below</div>
                </div>
                <div className="w-1/2 text-end">
                  <div className="mt-3 font-bold text-sm">{currentQuestion + 1} / {quizContent.content.questions.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-md bg-zinc-200 p-4 shadow-md mt-3">
          <div className="flex flex-col">
            <div
              className="text-xl font-semibold"
              dangerouslySetInnerHTML={{
                __html: quizContent.content.questions[currentQuestion].content,
              }}
            ></div>
            <div className="flex flex-col">
              {quizContent.content.questions[currentQuestion].options.map(
                (answer, index) => (
                  <div className="flex flex-row mt-2 hover:bg-gray-300 hover:rounded-lg hover:shadow-md" key = {index}>
                    <div className="flex w-10 pl-3 items-center cursor-pointer">
                      <input
                        type="radio"
                        name="answer"
                        id={`answer${index}`}
                        onClick={() => handleAnswerClick(index)}
                        checked={indexAnswer === index}
                      />
                    </div>
                    <div className="flex w-10/12 pl-2 items-center">
                      <label className="text-lg p-3 font-normal w-full cursor-pointer" htmlFor={`answer${index}`}>{answer.content}</label>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row mt-7">
          <div className="w-1/2">
            <Button
              variant="contained"
              color="primary"
              disabled={isFirstQuestion}
              onClick={handlePrevClick}
            >
              Previous
            </Button>
          </div>
          <div className="w-1/2 text-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextClick}
            >
              {isLastQuestion ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-200 w-auto h-auto p-5 rounded-md flex flex-col justify-center items-center">
            <img
              src="../../prize.png"
              alt="prize"
              className="w-40 h-40 mb-5"
            />
            <div className="text-2xl font-bold">You have finished the quiz</div>
            <div className="text-lg font-medium mt-2">
              You got {numCorrectAnswers} out of {quizContent.content.questions.length} correct answers
            </div>
            <div className="flex flex-row mt-3 justify-between">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseModalClick}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSection;
