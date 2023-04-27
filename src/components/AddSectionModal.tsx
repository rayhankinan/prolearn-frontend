import React, { ChangeEvent, useState } from "react";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import Section from "@/interfaces/section-interface";
import dynamic from "next/dynamic";
import SectionService from "@/services/section-service";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import "react-quill/dist/quill.snow.css";

const DynamicReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

type questionAndOptions = {
  content: string;
  options: [
    { content: string; isCorrect: boolean },
    { content: string; isCorrect: boolean },
    { content: string; isCorrect: boolean },
    { content: string; isCorrect: boolean }
  ];
};

interface AddSectionModalProps {
  material?: Section;
  courseId: string;
}

const AddSectionModal = ({ material, courseId }: AddSectionModalProps) => {
  const [questionAnswerList, setQuestionAnswerList] = useState<
    questionAndOptions[]
  >([]);
  const [name, setName] = useState(material?.title || "");
  const [body, setBody] = useState(" ");
  const [duration, setDuration] = useState(0);
  const [objective, setObjective] = useState(material?.objective || "");
  const [quiz, setQuiz] = useState(material?.quiz || "");
  const [countQuestion, setCountQuestion] = useState(0);
  const [number, setNumber] = useState(0);
  const [question, setQuestion] = useState(" ");
  const [answer, setAnswer] = useState(" ");
  const [trueAnswer, setTrueAnswer] = useState<string[]>([]);

  const [type, setType] = useState("material");

  const [nameError, setNameError] = useState(false);
  const [isBodyEmpty, setIsBodyEmpty] = useState<boolean>(false);
  const [durationError, setDurationError] = useState(false);
  const [objectiveError, setObjectiveError] = useState(false);
  const [quizError, setQuizError] = useState(false);
  const [countQuestionError, setCountQuestionError] = useState(false);
  const [contentError, setContentError] = useState<boolean[]>([false, false, false, false]);
  const [trueAnswerError, setTrueAnswerError] = useState(false);

  const handleTypeChange = (event: React.MouseEvent<HTMLElement>, newType: string) => {
    setType(newType);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(event.target.value === "");
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
    setIsBodyEmpty(value === "");
  };

  // const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setDuration(parseInt(event.target.value));
  //   setDurationError(parseInt(event.target.value) === 0);
  //   setDurationError(parseInt(event.target.value) < 0);
  //   setDurationError(event.target.value === "")
  // };

  const handleObjectiveChange = (event: ChangeEvent<HTMLInputElement>) => {
    setObjective(event.target.value);
    setObjectiveError(event.target.value === "");
  };

  const handleQuizChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuiz(event.target.value);
    setQuizError(event.target.value === "");
  };

  const handleCountQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(event.target.value);
    setCountQuestion(count);
    setCountQuestionError(count === 0);
    setCountQuestionError(count < 0);
    setCountQuestionError(event.target.value === "")

    setQuestionAnswerList((questionAnswerList) => [
      ... questionAnswerList,
      {
        content: " ",
        options: [
          {
            content: " ", isCorrect: false
          },
          {
            content: " ", isCorrect: false
          },
          {
            content: " ", isCorrect: false
          },
          {
            content: " ", isCorrect: false
          },
        ]
      },
    ]);

    // if the length of the list more than the event.target.value, make the list shorter
    if (questionAnswerList.length > count) {
      setQuestionAnswerList(questionAnswerList.slice(0, count));
    }

  };

  const handleNumberChange = (event: any) => {
    setNumber(event.target.value);
  };

  const handleQuestionChange = (index: number, value: string) => {
    setQuestionAnswerList((prev) => {
      const newList = [...prev];
      newList[index].content = value;
      return newList;
    });
  };

  const handleAddQuestion = () => {
    questionAnswerList[number - 1].content = question;
  };

  const handleAnswerChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    setQuestionAnswerList((prev) => {
      const newList = [...prev];
      // const errors = newList[questionIndex].options.map((option) => option.content === "");
      // setContentError(errors);
      newList[questionIndex].options[optionIndex].content = value;
      return newList;
    });
  };

  const handleAddAnswer = (questionIndex: number) => {
    const question = questionAnswerList[questionIndex];
    const emptyOption = question.options.find(
      (option) => option.content === ""
    );
    if (emptyOption) {
      emptyOption.content = answer;
    } else {
      console.log("Full");
    }
  };

  const handleTrueAnswerChange = (index: number, value: string) => {
    setQuestionAnswerList((prev) => {
      const newList = [...prev];
      newList[index].options.forEach((option) => {
        option.isCorrect = option.content === value;
      });
      return newList;
    });
    setTrueAnswer((prev) => {
      const newTrueAnswer: string[] = [...prev];
      newTrueAnswer[index] = value;
      return newTrueAnswer;
    });
  };

  const handleSave = () => {
    const html = document.querySelector(".ql-editor")?.innerHTML;

    const formData = new FormData();

    formData.append("courseId", courseId);
    formData.append("title", name);
    formData.append("duration", duration.toString());
    formData.append("objective", objective);
    formData.append("type", type);
    if (html) {
      const file = new Blob([html], { type: "text/html" });
      formData.append("file", file, "test.html");
    }

    if (quiz !== "") {
      const quizContent = {
        title: quiz,
        content: quiz,
        questions: questionAnswerList,
      };
      formData.append("quizContent", JSON.stringify(quizContent));
    }

    console.log(formData);
    SectionService.create(formData)
      .then((res) => {
        console.log(res);
        // refresh page
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(questionAnswerList);
  console.log(number);
  console.log(answer);

  return (
    <Container className="h-3/4 mb-2">
      <div className="h-4/5 overflow-auto">
        <div className="flex flex-row w-full mb-3">
          <Grid xs={3} className="flex justify-center items-center">
            <label>Section Title*</label>
          </Grid>
          <Grid xs={9} className="flex items-center">
            <TextField
              required
              variant="outlined"
              fullWidth
              value={name}
              onChange={handleNameChange}
              error={nameError}
              helperText={nameError ? "Material Name is required" : ""}
            />
          </Grid>
        </div>
        <div className="flex flex-row w-full mb-3">
          <Grid item xs={3} className="flex justify-center items-center">
            <label>Type*</label>
          </Grid>
          <Grid item xs={9} className="flex items-center">
            <ToggleButtonGroup 
              value={type}
              defaultValue={type}
              exclusive
              onChange={handleTypeChange}
              color="primary"
              className="w-full"
            >
              <ToggleButton 
                value="quiz"
                className="w-full text-center"
                style={{ paddingTop: "5px", paddingBottom: "5px"}}>
                Quiz
              </ToggleButton>

              <ToggleButton 
              value="material"
              style={{ width: "100%", textAlign: "center" }}>
                Material
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </div>
        {type === "material" ? (
          <>
          <div className="flex flex-row w-full mb-3">
            <Grid item xs={3} className="flex justify-center items-center">
              <label>Material Text*</label>
            </Grid>
            <Grid item xs={9} className="flex items-center">
              <div style={{ overflow: "auto", maxHeight: "350px" }}>
                <DynamicReactQuill
                  placeholder="Write your material here..."
                  modules={AddSectionModal.modules}
                  formats={AddSectionModal.formats}
                  onChange={handleBodyChange}
                  value={body}
                  style={{ border: isBodyEmpty ? "1px solid red" : "" }}
                />
              </div>
            </Grid>
          </div>
          <div className="flex flex-row w-full mb-3">
            <Grid item xs={3} className="flex justify-center items-center">
              <label>Objective</label>
            </Grid>
            <Grid item xs={9} className="flex items-center">
              <TextField
                variant="outlined"
                fullWidth
                required
                value={objective}
                onChange={handleObjectiveChange}
                error={objectiveError}
                helperText={objectiveError ? "Objective is required" : ""}
              />
            </Grid>
          </div>
          </>
        ) : (
          <>
            <div className="flex flex-row w-full mb-3">
              <Grid item xs={3} className="flex justify-center items-center">
                <label>Quiz Title*</label>
              </Grid>
              <Grid item xs={9} className="flex items-center">
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  value={quiz}
                  onChange={handleQuizChange}
                  error={quizError}
                  helperText={quizError ? "Quiz title is required" : ""}
                />
              </Grid>
            </div>
            <div className="flex flex-row w-full mb-3">
              <Grid item xs={3} className="flex justify-center items-center">
                <label>Description</label>
              </Grid>
              <Grid item xs={9} className="flex items-center">
                <div style={{ overflow: "auto", maxHeight: "350px" }}>
                  <DynamicReactQuill
                    placeholder="Write your quiz description here..."
                    modules={AddSectionModal.modules}
                    formats={AddSectionModal.formats}
                    onChange={handleBodyChange}
                    value={body}
                    style={{ border: isBodyEmpty ? "1px solid red" : "" }}
                  />
                </div>
              </Grid>
            </div>
            <div className="flex flex-row w-full mb-3">
              <Grid item xs={3} className="flex justify-center items-center">
                <label>Number of Questions*</label>
              </Grid>
              <Grid item xs={9} className="flex items-center">
                <TextField
                  variant="outlined"
                  fullWidth
                  required
                  type="number"
                  value={countQuestion}
                  onChange={handleCountQuestionChange}
                  error={countQuestionError}
                  helperText={countQuestionError ? "Number of Questions is required" : ""}
                  inputProps={{ min: 0 }}
                />
              </Grid>
            </div>
            {countQuestion > 0 && Array.from(Array(Math.max(0, countQuestion)), (e, i) => {
              const questionAnswer = questionAnswerList[i] || {options: []};
              return (
                <React.Fragment key={i}>
                  <div className="flex flex-row w-full mb-3">
                    <Grid item xs={3}className="flex justify-center items-center">
                      <label>Question No. {i+1}</label>
                    </Grid>
                    <Grid item xs={9}>
                      <div style={{overflow: "auto", maxHeight : "350px" }} className="flex items-center">
                        <DynamicReactQuill
                          placeholder="Write your question here..."
                          modules={AddSectionModal.modules}
                          formats={AddSectionModal.formats}
                          onChange={(content) => handleQuestionChange(i, content)}
                          value={questionAnswer.content}
                        />
                      </div>
                    </Grid>
                  </div>
                  {[...Array(4)].map((_, j) => (
                    <React.Fragment key={j}>
                      <div className="flex flex-row w-full mb-3">
                        <Grid item xs={3} className="flex justify-center items-center">
                          <label>Option {j+1}</label>
                        </Grid>
                        <Grid item xs={9} className="flex items-center">
                          <TextField
                            variant="outlined"
                            fullWidth
                            required
                            value={questionAnswer.options[j]?.content || ""}
                            onChange={(event) => handleAnswerChange(i, j, event.target.value)}
                            error={contentError[j]}
                            helperText={contentError[j] ? "Content is required" : ""}
                          />
                        </Grid>
                      </div>
                    </React.Fragment>
                  ))}
                  <div className="flex flex-row w-full mb-3">
                    <Grid item xs={3} className="flex justify-center items-center">
                      <label>Correct Answer</label>
                    </Grid>
                    <Grid item xs={9} className="flex items-center">
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id={`correct-answer-${i+1}-label`}>
                          Choose Answer
                        </InputLabel>
                        <Select
                          labelId={`correct-answer-${i+1}-label`}
                          id={`correct-answer-${i+1}`}
                          value={trueAnswer[i] || ""}
                          onChange={(event) => handleTrueAnswerChange(i, String(event.target.value))}
                          label="Correct Answer"
                          required
                        >
                          {[...Array(4)].map((_, j) => (
                            <MenuItem key={j} value={questionAnswer.options[j]?.content || ""}>
                              {questionAnswer.options[j]?.content || ""}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </div>
                </React.Fragment>
              )
            })}
          </>
        )}


      </div>
      <Grid item xs={12}>
        <div className="flex justify-center mt-10">
          <Button
            className="w-24"
            onClick={(e) => {
              if(name === "") {
                alert("Section title is required");
              }
              if(type === "material") {
                if (body === null) {
                  alert("Material Text is required");
                } else if (objective === "") {
                  alert("Objective is required"); 
                } else {
                  handleSave();
                }
              }
              if(type === "quiz"){
                if (quiz === "") {
                  alert("Quiz title is required");
                } else if(countQuestion === 0) {
                  alert("Number of questions cannot be 0");
                } else if(countQuestion > 0) {
                  let isQuestionEmpty = false;
                  let isAnswerEmpty = false;
                  for(let i = 0; i < countQuestion; i++) {
                    if(questionAnswerList[i].content === "") {
                      isQuestionEmpty = true;
                    }

                    for(let j = 0; j < 4; j++) {
                      if(questionAnswerList[i].options[j].content === "") {
                        isAnswerEmpty = true;
                        break;
                      }
                    }

                    if(isQuestionEmpty || isAnswerEmpty) {
                      break;
                    }
                  }
                  if (isQuestionEmpty) {
                    alert("Question is required");
                  } else if (isAnswerEmpty) {
                    alert("Answer is required");
                  } else if (trueAnswer.includes("")) {
                    alert("Correct Answer is required");
                  } else if (!isQuestionEmpty && !isAnswerEmpty && !trueAnswer.includes("")) {
                    handleSave();
                  }
                } 
              }
            }
          }
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </div>
      </Grid>
    </Container>
  );
};

AddSectionModal.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
    //set min height for quill editor
    [{ height: "350px" }],
  ],
};

AddSectionModal.formats = [
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

export default AddSectionModal;
