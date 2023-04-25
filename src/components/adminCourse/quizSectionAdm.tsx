import React, { useState } from "react";
import Quiz from "@/interfaces/quiz-interface";
import quizService from "@/services/quiz-service";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import sectionService from "@/services/section-service";
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const DynamicReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

interface QuizSectionProps {
  quizContent: Quiz;
  title?: string;
  courseId: string;
  materialId: number;
}

type options = {
  content: string;
  isCorrect: boolean;
};

const QuizSectionAdm: React.FC<QuizSectionProps> = ({
  quizContent,
  title,
  courseId,
  materialId,
}) => {
  const [name, setName] = useState(title || "");
  const [questions, setQuestions] = useState<Quiz>(quizContent);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEditQModal, setShowEditQModal] = useState(false);
  const [showEditAModal, setShowEditAModal] = useState(false);
  const [showEditTModal, setShowEditTModal] = useState(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [newAnswerA, setNewAnswerA] = useState<options>({
    content: "",
    isCorrect: false,
  });
  const [newAnswerB, setNewAnswerB] = useState<options>({
    content: "",
    isCorrect: false,
  });
  const [newAnswerC, setNewAnswerC] = useState<options>({
    content: "",
    isCorrect: false,
  });
  const [newAnswerD, setNewAnswerD] = useState<options>({
    content: "",
    isCorrect: false,
  });
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [deleteMode, setDeleteMode] = useState(false);

  const setQuizContent = (content: any) => {
    quizContent = content;
  };

  const handleAddQuestionClick = () => {
    setShowAddQuestionModal(true);
  };

  const handleQuizTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuizTitle(event.target.value);
  };

  const handleQuestionChange = (value: string) => {
    setNewQuestion(value);
  };

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newQuizContent = { ...quizContent };
    newQuizContent.content.questions[currentQuestion].options[index].content =
      event.target.value;
    setQuizContent(newQuizContent);
  };

  const handleCorrectAnswerChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newQuizContent = { ...quizContent };
    newQuizContent.content.questions[currentQuestion].options[index].isCorrect =
      event.target.value === "true";
    setQuizContent(newQuizContent);
  };

  const handleAnswerChangeA = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnswerA({ content: event.target.value, isCorrect: false });
  };
  const handleAnswerChangeB = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnswerB({ content: event.target.value, isCorrect: false });
  };
  const handleAnswerChangeC = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnswerC({ content: event.target.value, isCorrect: false });
  };
  const handleAnswerChangeD = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAnswerD({ content: event.target.value, isCorrect: false });
  };

  const handleNewCorrectAnswer = (event: any) => {
    if ("A" === event.target.value) {
      setNewAnswerA({ content: newAnswerA.content, isCorrect: true });
    } else if ("B" === event.target.value) {
      setNewAnswerB({ content: newAnswerB.content, isCorrect: true });
    } else if ("C" === event.target.value) {
      setNewAnswerC({ content: newAnswerC.content, isCorrect: true });
    } else if ("D" === event.target.value) {
      setNewAnswerD({ content: newAnswerD.content, isCorrect: true });
    }
  };

  const handleNextClick = () => {
    // setCurrentQuestion((prev) => prev + 1);
    if (currentQuestion < questions.content.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleFinishClick();
    }
  };

  const handleEditTitleClick = () => {
    setShowEditTModal(true);
  };

  const handleEditQuestionClick = () => {
    setShowEditQModal(true);
  };

  const handleEditAnswerClick = () => {
    setShowEditAModal(true);
  };

  const handlePrevClick = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleFinishClick = () => {
    const html = document.querySelector(".ql-editor")?.innerHTML;

    const formData = new FormData();

    formData.append("courseId", courseId.toString());
    formData.append("title", name);
    formData.append("duration", "0");
    formData.append("objective", "none");
    formData.append("type", "quiz");

    if (html) {
      const file = new File([html], "test.html", { type: "text/html" });
      formData.append("file", file);
    }

    formData.append("quizContent", JSON.stringify(questions.content));

    sectionService
      .update(materialId.toString(), formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    if (deleteMode === true) {
      setShowDeleteModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModalClick = () => {
    setShowModal(false);
    window.location.reload();
  };

  const handleCloseDeleteModalClick = () => {
    setShowDeleteModal(false);
    window.location.reload();
  };

  const isLastQuestion =
    currentQuestion === questions.content.questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  console.log(questions);

  return (
    <div style={{ marginTop: "20px" }} className="bg-gray-100 w-full h-full p-4 shadow-lg bg-gray-200 rounded-md">
      <div className="flex flex-col font-sans">
        <div className="flex flex-col">
          {questions.content.questions.length > 0 &&
          currentQuestion <= questions.content.questions.length ? (
            <>
              <div className="flex flex-row w-full">
                <div className="w-full">
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between rounded-md bg-neutral-300 p-2">
                      <div className="w-fit text-3xl font-semibold">
                        {questions.content.title}
                      </div>
                      <Button
                        className="w-fit h-fit text-end"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditTitleClick()}
                      >
                        Edit Title
                      </Button>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-1/2">
                        <div className="mt-3 text-sm">Answer The Question Below</div>
                      </div>
                      <div className="w-1/2 text-end">
                        <div className="mt-3 font-bold text-sm">
                          {currentQuestion + 1} / {quizContent.content.questions.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-3">
                <div className="flex justify-between">
                  <div
                    className="text-2xl font-semibold w-3/5 items-center"
                    dangerouslySetInnerHTML={{
                      __html:
                        questions.content.questions[currentQuestion].content,
                    }}
                  ></div>
                  <Button
                    className="w-fit h-fit text-end"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => setShowEditQModal(true)}
                  >
                    Edit Question
                  </Button>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col w-4/5 mt-1">
                    {questions.content.questions[currentQuestion].options.map(
                      (answer, index) => (
                        <div className="flex flex-row mt-3">
                          <div className="flex w-1/6">
                            <div>
                              <div className="text-lg font-normal">
                                Option {index + 1}
                              </div>
                            </div>
                          </div>
                          <div className="w-5/6">
                            <label className="text-lg font-medium" htmlFor={`answer${index}`}>
                              {answer.content}
                            </label>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <Button
                    style={{ marginTop: "0.75rem" }}
                    className="w-fit h-fit text-end"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => setShowEditAModal(true)}
                  >
                    Edit Options
                  </Button>
                </div>
              </div>

              <div className="flex flex-row justify-evenly mt-3">
                <div className="w-fit">
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setShowAddQuestionModal(true)}
                  >
                    Add Question
                  </Button>
                </div>
                <div className="w-fit text-end">
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      setShowDeleteQuestionModal(true);
                      setDeleteMode(true);
                    }}
                  >
                    Delete Question(s)
                  </Button>
                </div>
              </div>

              <div className="flex flex-row mt-4">
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
            </>
          ) : (
            <div className="flex flex-col justify-center items-center mt-2">
              <p className="text-2xl font-semibold">
                There are not any questions in this quiz.
              </p>
              <div className="w-fit mt-3 mb-3">
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setShowAddQuestionModal(true)}
                  >
                    Add Question
                  </Button>
                </div>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/2 h-1/2 rounded-md flex flex-col justify-center items-center">
            <img
              src="../../prize.png"
              alt="prize"
              className="w-40 h-40 mb-12"
            />
            <h1 className="text-2xl font-bold">Horay</h1>
            <h1 className="text-2xl font-bold mt-4">
              You have finished editing the quiz
            </h1>
            <div className="flex flex-row mt-12 justify-between">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-4 mr-4"
                onClick={handleCloseModalClick}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/2 h-1/2 rounded-md flex flex-col justify-center items-center">
            <img
              src="../../prize.png"
              alt="prize"
              className="w-40 h-40 mb-12"
            />
            <h1 className="text-2xl font-bold">Horay</h1>
            <h1 className="text-2xl font-bold mt-4">
              You have deleted the question
            </h1>
            <div className="flex flex-row mt-12 justify-between">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-4 mr-4"
                onClick={handleCloseDeleteModalClick}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditQModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/2 h-1/2 rounded-md flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Change your Question</h1>
            <div style={{ overflow: "auto", height: "auto" }}>
              <DynamicReactQuill
                placeholder="Write your question here"
                value={newQuestion}
                onChange={handleQuestionChange}
              />
            </div>
            <div className="flex flex-row mt-2 justify-between">
              <button
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 mt-4 mr-4"
                onClick={() => {
                  setShowEditQModal(false);
                  questions.content.questions[currentQuestion].content =
                    newQuestion;
                }}
              >
                Save
              </button>
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mt-4 ml-4"
                onClick={() => setShowEditQModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditAModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/2 h-1/2 rounded-md flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Enter New Answers</h1>
            {[0, 1, 2, 3].map((index) => (
              <div className="flex flex-row mt-4" key={index}>
                <div className="flex w-3/12 ">
                  <div className="">
                    <p className="text-l font-bold">Option {index + 1}</p>
                  </div>
                </div>
                <div className="w-6/12" style={{ paddingTop: "4px" }}>
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 rounded-md w-full mb-4"
                    placeholder={`Enter New Answer ${index + 1}`}
                    defaultValue={
                      questions.content.questions[currentQuestion].options[
                        index
                      ].content
                    }
                    onChange={(event) => handleAnswerChange(event, index)}
                  />
                </div>
                <div className="flex w-3/12">
                  <select
                    className="border-2 border-gray-300 p-2 rounded-md w-full mb-4"
                    defaultValue={
                      questions.content.questions[currentQuestion].options[
                        index
                      ].isCorrect
                        ? "true"
                        : "false"
                    }
                    onChange={(event) =>
                      handleCorrectAnswerChange(event, index)
                    }
                  >
                    <option value="true">Correct</option>
                    <option value="false">Incorrect</option>
                  </select>
                </div>
              </div>
            ))}
            <div className="flex flex-row mt-2 justify-between">
              <button
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 mt-4 mr-4"
                onClick={() => {
                  setShowEditAModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditTModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/2 h-1/2 rounded-md flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Edit Quiz Title</h1>
            <input
              type="text"
              value={quizTitle}
              onChange={handleQuizTitleChange}
              className="border-gray-400 border-2 p-2 rounded-md w-full mb-4"
            />
            <div className="flex flex-row mt-2 justify-between">
              <button
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 mt-4 mr-4"
                onClick={() => {
                  setShowEditTModal(false);
                  questions.content.title = quizTitle;
                }}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                onClick={() => setShowEditTModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteQuestionModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/2 h-1/2 rounded-md flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">Delete Question</h1>
            <p className="text-lg font-bold mb-4">
              Are you sure you want to delete this question?
            </p>
            <div className="flex flex-col pl-6 pr-6 pt-6 overflow-y-auto">
              {questions.content.questions.map((question, index) => (
                <div key={index} className="flex items-center mb-2">
                  <p
                    className="text-lg font-bold mr-2"
                    dangerouslySetInnerHTML={{
                      __html: `Question-${index + 1}:${question.content}`,
                    }}
                  ></p>
                  <button
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                    onClick={() => {
                      const updatedQuestions = questions.content.questions;
                      const theFirstQuestion = index === 0;
                      const theLastQuestion =
                        index === updatedQuestions.length - 1;
                      const theOnlyQuestion = updatedQuestions.length === 1;

                      updatedQuestions.splice(index, 1);
                      setQuestions({
                        ...questions,
                        content: {
                          ...questions.content,
                          questions: updatedQuestions,
                        },
                      });
                      if (currentQuestion === index) {
                        if (theFirstQuestion && !theOnlyQuestion) {
                          setCurrentQuestion(0);
                        } else if (theLastQuestion && !theOnlyQuestion) {
                          setCurrentQuestion(updatedQuestions.length - 1);
                        } else if (theOnlyQuestion) {
                          /* DO NOTHING */
                        } else {
                          setCurrentQuestion(currentQuestion - 1);
                        }
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
                onClick={() => {
                  setShowDeleteQuestionModal(false);
                  setDeleteMode(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddQuestionModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md w-1/2">
            <h1 className="text-2xl font-bold p-4 border-b">Add Question</h1>
            <div className="p-4">
              <h2 className="mb-2">Question:</h2>
              <div style={{ overflow: "auto", height: "auto" }}>
                <DynamicReactQuill
                  placeholder="Write your question here"
                  value={newQuestion}
                  onChange={handleQuestionChange}
                />
              </div>
              <h2 className="mb-2">Option A:</h2>
              <input
                type="text"
                className="border-gray-400 border-2 p-2 rounded-md w-full mb-4"
                onChange={handleAnswerChangeA}
              />
              <h2 className="mb-2">Option B:</h2>
              <input
                type="text"
                className="border-gray-400 border-2 p-2 rounded-md w-full mb-4"
                onChange={handleAnswerChangeB}
              />
              <h2 className="mb-2">Option C:</h2>
              <input
                type="text"
                className="border-gray-400 border-2 p-2 rounded-md w-full mb-4"
                onChange={handleAnswerChangeC}
              />
              <h2 className="mb-2">Option D:</h2>
              <input
                type="text"
                className="border-gray-400 border-2 p-2 rounded-md w-full mb-4"
                onChange={handleAnswerChangeD}
              />
              <h2 className="mb-2">Correct Answer:</h2>
              <select
                className="border-gray-400 border-2 p-2 rounded-md w-full mb-4"
                defaultValue={""}
                onChange={handleNewCorrectAnswer}
              >
                <option value="" disabled>
                  Choose Answer
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
              <div className="flex justify-end">
                <button
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 mr-2"
                  onClick={() => {
                    setShowAddQuestionModal(false);
                    questions.content.questions.push({
                      content: newQuestion,
                      options: [newAnswerA, newAnswerB, newAnswerC, newAnswerD],
                    });
                  }}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                  onClick={() => setShowAddQuestionModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSectionAdm;
