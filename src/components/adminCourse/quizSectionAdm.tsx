import React, { useState } from "react";
import Quiz from "@/interfaces/quiz-interface";
import quizService from "@/services/quiz-service";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import sectionService from "@/services/section-service";
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton } from "@material-ui/core";
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

const QuizSectionAdm = ({
  quizContent,
  title,
  courseId,
  materialId,
}: QuizSectionProps) => {
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
  const [quizTitle, setQuizTitle] = useState<string>(questions.content.title);
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
    if (currentQuestion < questions.content.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleFinishClick();
    }
  };

  const handleEditTitleClick = () => {
    setShowEditTModal(true);
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

  const isLastQuestion =
    currentQuestion === questions.content.questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  return (
    <div className="w-3/4 h-full p-4 shadow-lg bg-gray-200 rounded-md m-auto">
      <div className="flex flex-col font-sans">
        <div className="flex flex-col">
          {questions.content.questions.length > 0 &&
          currentQuestion <= questions.content.questions.length ? (
            <>
              <div className="flex flex-row w-full">
                <div className="w-full">
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <div className="w-fit text-3xl font-semibold">
                        {questions.content.title}
                      </div>
                      <IconButton
                        className="flex flex row justify-center items-center w-fit h-fit text-end"
                        color="primary"
                        size="small"
                        onClick={() => handleEditTitleClick()}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-1/2">
                        <div className="mt-3 text-sm">Answer The Question Below</div>
                      </div>
                      <div className="w-1/2 text-end">
                        <div className="mt-3 font-bold text-sm">
                          {currentQuestion + 1} / {questions.content.questions.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-3 rounded-md bg-zinc-200 p-4 shadow-md">
                <div className="flex justify-start">
                  <div
                    className="text-2xl font-semibold w-fit items-center"
                    dangerouslySetInnerHTML={{
                      __html:
                        questions.content.questions[currentQuestion].content,
                    }}
                  ></div>
                  <IconButton
                    className="w-fit h-fit text-end"
                    color="primary"
                    size="small"
                    onClick={
                      () => {
                        setNewQuestion("");
                        setShowEditQModal(true);
                      }
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col w-4/5 mt-1">
                    {questions.content.questions[currentQuestion].options.map(
                      (answer, index) => (
                        <div className="flex flex-row mt-5">
                          <div style={{ borderRight: '3px solid gray' }} className="flex w-24">
                            <div>
                              <div style={{ color: "gray" }} className="text-lg font-medium">
                                Option {index + 1}
                              </div>
                            </div>
                          </div>
                          <div className="w-5/6 pl-5">
                            <label className="text-lg font-medium" htmlFor={`answer${index}`}>
                              {answer.content}
                            </label>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <Button
                    style={{ marginTop: "1.25rem" }}
                    className="w-1/6 h-fit"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => setShowEditAModal(true)}
                  >
                    Edit Options
                  </Button>
                </div>
              </div>

              <div className="flex flex-row justify-end mt-3">
                <div className="w-fit">
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setShowAddQuestionModal(true)}
                  >
                    New Question
                  </Button>
                </div>
                <div className="w-fit text-end ml-2">
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      setShowDeleteQuestionModal(true);
                      setDeleteMode(true);
                    }}
                  >
                    Delete Questions
                  </Button>
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
            </>
          ) : (
            <div className="flex flex-col justify-center items-center mt-2">
              <p className="text-2xl font-semibold">
                There aren't any questions in this quiz.
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
          <div className="bg-gray-200 w-auto h-auto p-10 rounded-md flex flex-col justify-center items-center">
            <div className="text-xl font-bold">
              The quiz has been successfully edited.
            </div>
            <div className="flex flex-row justify-between mt-7">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseModalClick}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      {showEditQModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-200 w-auto h-auto p-4 rounded-lg flex flex-col justify-center items-center shadow=lg">
            <h1 className="text-2xl font-semibold mb-3">Change your Question</h1>
            <div style={{ overflow: "auto", height: "auto", width: "30vw", marginBottom: "1rem" }}>
              <DynamicReactQuill
                placeholder="Write your new question here"
                value={newQuestion}
                modules={QuizSectionAdm.modules}
                formats={QuizSectionAdm.formats}
                onChange={handleQuestionChange}
              />
            </div>
            <div className="flex flex-col">
              <Button
                style={{ marginBottom: "10px" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowEditQModal(false);
                  questions.content.questions[currentQuestion].content =
                    newQuestion;
                  setNewQuestion("");
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setShowEditQModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {showEditAModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-200 w-3/4 h-auto p-4 rounded-md flex flex-col justify-center items-center shadow-lg">
            <div className="text-2xl font-semibold mb-3">Enter New Answers</div>
            {[0, 1, 2, 3].map((index) => (
              <div className="flex flex-row w-3/4" key={index}>
                <div className="flex w-2/12 ">
                  <div className="mt-3">
                    <p className="text-l font-semibold">Option {index + 1}</p>
                  </div>
                </div>
                <div className="w-10/12">
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 rounded-md w-full h-fit mb-4"
                    placeholder="Enter your answer"
                    defaultValue={
                      questions.content.questions[currentQuestion].options[
                        index
                      ].content
                    }
                    onChange={(event) => handleAnswerChange(event, index)}
                  />
                </div>
                <div className="flex w-2/12">
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
            <div className="flex flex-row mt-1 justify-between">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setShowEditAModal(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      {showEditTModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-200 w-1/3 h-auto p-4 rounded-lg flex flex-col justify-center items-center shadow-lg">
            <div className="text-2xl font-semibold mb-3">Edit Quiz Title</div>
            <input
              type="text"
              defaultValue={questions.content.title}
              onChange={handleQuizTitleChange}
              className="border-gray-400 border-2 p-2 rounded-md w-2/3 mb-4"
            />
            <div className="flex flex-col">
              <Button
                style={{marginBottom: "10px"}}
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowEditTModal(false);
                  questions.content.title = quizTitle;
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setShowEditTModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {showDeleteQuestionModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-200 w-1/2 h-auto p-4 rounded-md flex flex-col justify-center items-center shadow-lg">
            <div className="text-2xl font-bold mb-2">Delete Question(s)</div>
            <div className="text-lg font-semibold mb-3">
              Are you sure you want to delete these question(s)?
            </div>
            <div className="flex flex-col overflow-y-auto w-3/4">
              {questions.content.questions.map((question, index) => (
                <div key={index} className="flex flex-row justify-between items-center w-full mb-2">
                  <div className="w-1 text-lg font-medium">
                    {index + 1}.
                  </div>
                  <p className="w-4/6">
                    <p
                      className="text-lg font-medium"
                      dangerouslySetInnerHTML={{
                        __html: question.content
                      }}
                    ></p>
                  </p>
                  <Button
                    className="w-1/5"
                    variant="contained"
                    color="secondary"
                    endIcon={<DeleteIcon />}
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
                    Delete
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-3">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowDeleteQuestionModal(false);
                  setDeleteMode(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      {showAddQuestionModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-200 w-1/2 h-auto rounded-md flex flex-col justify-center items-center shadow-lg">
            <h1 className="text-2xl font-semibold pt-1">Add Question</h1>
            <div className="p-2">
              <h2 className="font-medium">Question:</h2>
              <div style={{ overflow: "auto", maxHeight: "300px", width: "30vw", marginBottom: "0.25rem" }}>
                <DynamicReactQuill
                  placeholder="Write your question here"
                  value={newQuestion}
                  modules={QuizSectionAdm.modules}
                  formats={QuizSectionAdm.formats}
                  onChange={handleQuestionChange}
                />
              </div>
              <div>Option 1:</div>
              <input
                type="text"
                className="border-gray-400 border-2 p-2 rounded-md w-full mb-1"
                onChange={handleAnswerChangeA}
              />
              <div>Option 2:</div>
              <input
                type="text"
                className="border-gray-400 border-2 p-2 rounded-md w-full mb-1"
                onChange={handleAnswerChangeB}
              />
              <div>Option 3:</div>
              <input
                type="text"
                className="border-gray-400 border-2 p-2 rounded-md w-full mb-1"
                onChange={handleAnswerChangeC}
              />
              <div>Option 4:</div>
              <input
                type="text"
                className="border-gray-400 border-2 p-2 rounded-md w-full mb-1"
                onChange={handleAnswerChangeD}
              />
              <div>Correct Answer:</div>
              <select
                className="border-gray-400 border-2 p-2 rounded-md w-full mb-1"
                defaultValue=""
                onChange={handleNewCorrectAnswer}
              >
                <option value="" disabled>
                  Choose Answer
                </option>
                <option value="A">Option 1</option>
                <option value="B">Option 2</option>
                <option value="C">Option 3</option>
                <option value="D">Option 4</option>
              </select>
              <div className="flex flex-col mt-2">
                <Button
                  style={{marginBottom: "10px"}}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setShowAddQuestionModal(false);
                    questions.content.questions.push({
                      content: newQuestion,
                      options: [newAnswerA, newAnswerB, newAnswerC, newAnswerD],
                    });
                  }}
                >
                  Save
                </Button>
                <Button
                  style={{ marginBottom: "10px" }}
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowAddQuestionModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

QuizSectionAdm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

QuizSectionAdm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

export default QuizSectionAdm;
