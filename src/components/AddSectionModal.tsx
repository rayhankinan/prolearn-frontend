import React, { ChangeEvent, useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import Section from "@/interfaces/section-interface";
import dynamic from "next/dynamic";
import SectionService from "@/services/section-service";
import "react-quill/dist/quill.snow.css";

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@mui/material";

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
  ]
}

interface AddSectionModalProps {
  material?: Section;
  courseId: string;
}

const AddSectionModal = ({ 
  material, courseId }: AddSectionModalProps) => {

  const [questionAnswerList, setQuestionAnswerList] = useState<questionAndOptions[]>([]);
  const [name, setName] = useState(material?.title || "");
  const [body, setBody] = useState(" ");
  const [duration, setDuration] = useState(material?.duration || 0);
  const [objective, setObjective] = useState(material?.objective || "");
  const [quiz, setQuiz] = useState(material?.quiz || "");
  const [countQuestion, setCountQuestion] = useState(0);
  const [number, setNumber] = useState(0);
  const [question, setQuestion] = useState(" ");
  const [answer, setAnswer] = useState(" ");
  const [trueAnswer, setTrueAnswer] = useState(" ");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleBodyChange = (value: string | null) => {
    if (value != null) {
      setBody(value);
    }
  };

  const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDuration(parseInt(event.target.value));
  };

  const handleObjectiveChange = (event: ChangeEvent<HTMLInputElement>) => {
    setObjective(event.target.value);
  };

  const handleQuizChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuiz(event.target.value);
  };

  const handleCountQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(event.target.value);
    setCountQuestion(count);

    setQuestionAnswerList((prev) => {
      const currentCount = prev.length;
      const newCount = Math.max(currentCount, count);
      const newList = prev.slice(0, newCount);

      for (let i = currentCount; i < newCount; i++) {
        newList[i] = {
          content: '',
          options: [
            { content: '', isCorrect: false },
            { content: '', isCorrect: false },
            { content: '', isCorrect: false },
            { content: '', isCorrect: false },
          ],
        };
      }

      return newList;
    });
  };

  const handleNumberChange = (event: any) => {
    setNumber(event.target.value);
  }

  const handleQuestionChange = (index: number, value: string) => {
    setQuestionAnswerList((prev) => {
      const newList = [...prev];
      newList[index].content = value;
      return newList;
    });
  };


  const handleAddQuestion = () => {
    questionAnswerList[number - 1].content = question;
  }

  const handleAnswerChange = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestionAnswerList((prev) => {
      const newList = [...prev];
      newList[questionIndex].options[optionIndex].content = value;
      return newList;
    });
  };

  const handleAddAnswer = (questionIndex: number) => {
    const question = questionAnswerList[questionIndex];
    const emptyOption = question.options.find(option => option.content === "");
    if (emptyOption) {
      emptyOption.content = answer;
    } else {
      console.log("Full");
    }
  }

  const handleTrueAnswerChange = (index: number, value: string) => {
    setQuestionAnswerList((prev) => {
      const newList = [...prev];
      newList[index].options.forEach((option) => {
        option.isCorrect = option.content === value;
      });
      return newList;
    });
    setTrueAnswer((prev) => {
      const newTrueAnswer = [...prev];
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
    formData.append("type", "material");
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
    <Grid container spacing={3} style={{height: "600px", overflow: "auto"}}>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Material Name</label>
      </Grid>
      <Grid item xs={9}>
        <TextField
          variant="outlined"
          fullWidth
          value={name}
          onChange={handleNameChange}
        />
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Material Text</label>
      </Grid>
      <Grid item xs={9}>
        <div style={{overflow: "auto", maxHeight : "350px" }}>
          <DynamicReactQuill
            placeholder="Write something amazing"
            modules={AddSectionModal.modules}
            formats={AddSectionModal.formats}
            onChange={handleBodyChange}
            value={body}
            
          />
        </div>
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Duration (in minutes)</label>
      </Grid>
      <Grid item xs={9}>
        <TextField
          variant="outlined"
          fullWidth
          type="number"
          value={duration}
          onChange={handleDurationChange}
        />
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Objective</label>
      </Grid>
      <Grid item xs={9}>
        <TextField
          variant="outlined"
          fullWidth
          value={objective}
          onChange={handleObjectiveChange}
        />
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Quiz Title</label>
      </Grid>
      <Grid item xs={9}>
        <TextField
          variant="outlined"
          fullWidth
          value={quiz}
          onChange={handleQuizChange}
        />
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Jumlah Soal</label>
      </Grid>
      <Grid item xs={9}>
        <TextField
          variant="outlined"
          fullWidth
          type="number"
          value={countQuestion}
          onChange={handleCountQuestionChange}
        />
      </Grid>
      {/* Create Dropdown for question */}
        {countQuestion > 0 && Array.from(Array(Math.max(0, countQuestion)), (e, i) => {
        const questionAnswer = questionAnswerList[i] || {options: []};
        return (
          <React.Fragment key={i}>
            <Grid item xs={3} style={{ marginTop: "16px" }}>
              <label>Question {i+1}</label>
            </Grid>
            <Grid item xs={9}>
              <div style={{overflow: "auto", maxHeight : "350px" }}>
                <DynamicReactQuill
                  placeholder="Write something amazing"
                  modules={AddSectionModal.modules}
                  formats={AddSectionModal.formats}
                  onChange={(content) => handleQuestionChange(i, content)}
                  value={questionAnswer.content}
                />
              </div>
            </Grid>
            {[...Array(4)].map((_, j) => (
              <React.Fragment key={j}>
                <Grid item xs={3} style={{ marginTop: "16px" }}>
                  <label>Answer {j+1}</label>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={questionAnswer.options[j]?.content || ""}
                    onChange={(event) => handleAnswerChange(i, j, event.target.value)}
                  />
                </Grid>
                {/* <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="bg-green-500 hover:bg-green-600"
                    style={{color: "white" }}
                    onClick={() => handleAddAnswer(i)}
                  >
                    Add
                  </Button>
                </Grid> */}
              </React.Fragment>
            ))}
            <Grid item xs={3} style={{ marginTop: "16px" }}>
              <label>Correct Answer</label>
            </Grid>
            <Grid item xs={9}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id={`correct-answer-${i+1}-label`}>
                  Correct Answer
                </InputLabel>
                <Select
                  labelId={`correct-answer-${i+1}-label`}
                  id={`correct-answer-${i+1}`}
                  value={trueAnswer[i] || ""}
                  onChange={(event) => handleTrueAnswerChange(i, String(event.target.value))}
                  label="Correct Answer"
                >
                  {[...Array(4)].map((_, j) => (
                    <MenuItem key={j} value={questionAnswer.options[j]?.content || ""}>
                      {questionAnswer.options[j]?.content || ""}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </React.Fragment>
        )
      })}

      <Grid item xs={12}>
        <div className="flex justify-center mt-5">
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Save
          </button>
        </div>
      </Grid>
    </Grid>
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
