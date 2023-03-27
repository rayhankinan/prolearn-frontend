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
    setCountQuestion(parseInt(event.target.value));

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
    if (questionAnswerList.length > parseInt(event.target.value)) {
      setQuestionAnswerList(questionAnswerList.slice(0, parseInt(event.target.value)));
    }
  };

  const handleNumberChange = (event: any) => {
    setNumber(event.target.value);
  }

  const handleQuestionChange = (value: string | null) => {
    if (value != null) {
      setQuestion(value);
    }
  }

  const handleAddQuestion = () => {
    questionAnswerList[number - 1].content = question;
  }

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  }

  const handleAddAnswer = () => {
    if (questionAnswerList[number - 1].options[0].content == " ") {
      questionAnswerList[number - 1].options[0].content = answer;
    } else if (questionAnswerList[number - 1].options[1].content == " ") {
      questionAnswerList[number - 1].options[1].content = answer;
    }
    else if (questionAnswerList[number - 1].options[2].content == " ") {
      questionAnswerList[number - 1].options[2].content = answer;
    } else if (questionAnswerList[number - 1].options[3].content == " ") {
      questionAnswerList[number - 1].options[3].content = answer;
    } else {
      console.log("full");
    }
  }

  const handleTrueAnswerChange = (event: any) => {
    setTrueAnswer(event.target.value);

    if (questionAnswerList[number - 1].options[0].content == event.target.value) {
      questionAnswerList[number - 1].options[0].isCorrect = true;
    } else if (questionAnswerList[number - 1].options[1].content == event.target.value) {
      questionAnswerList[number - 1].options[1].isCorrect = true;
    } else if (questionAnswerList[number - 1].options[2].content == event.target.value) {
      questionAnswerList[number - 1].options[2].isCorrect = true;
    } else if (questionAnswerList[number - 1].options[3].content == event.target.value) {
      questionAnswerList[number - 1].options[3].isCorrect = true;
    }
  }

  const handleSave = () => {
    const html = document.querySelector(".ql-editor")?.innerHTML;

    
    const formData = new FormData();
    
    formData.append("courseId", courseId)
    formData.append("title", name);
    formData.append("duration", duration.toString());
    formData.append("objective", objective);
    formData.append("type", "material");
    if (html) {
      const file = new File([html], "test.html", { type: "text/html" });
      formData.append("file", file);
    }

    if (quiz !== "") {
      const quizContent = {
        title: quiz,
        content: quiz,
        questions: questionAnswerList,
      }
  
      formData.append("quizContent", JSON.stringify(quizContent));
    }

    console.log(formData)
    SectionService.create(formData)
      .then((res) => {
        console.log(res);
        //refresh page
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      }
      );
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
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Question</label>
      </Grid>
      <Grid item xs={9}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">
            Questions
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={number}
            onChange={handleNumberChange}
            label="Question"
          >
            {questionAnswerList.map((item, index) => {
              return (
                <MenuItem key={index} value={index+1}>
                  {index+1}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Question</label>
      </Grid>
      <Grid item xs={9}>
        <div style={{overflow: "auto", maxHeight : "350px" }}>
          <DynamicReactQuill
            placeholder="Write something amazing"
            modules={AddSectionModal.modules}
            formats={AddSectionModal.formats}
            onChange={handleQuestionChange}
            value={question}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="bg-green-500 hover:bg-green-600"
          style={{color: "white", marginTop: "16px" }}
          onClick={handleAddQuestion}
        >
          Add
        </Button>
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Answers</label>
      </Grid>
      <Grid item xs={7}>
        <TextField
          variant="outlined"
          fullWidth
          value={answer}
          onChange={handleAnswerChange}
        />
      </Grid>
      <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="bg-green-500 hover:bg-green-600"
          style={{color: "white" }}
          onClick={() => handleAddAnswer()}
        >
          Add
        </Button>
      </Grid>
      <Grid item xs={3} style={{ marginTop: "16px" }}>
        <label>Correct Answer</label>
      </Grid>
      <Grid item xs={9}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">
            Correct Answer
          </InputLabel>
          {number !== 0 ? 
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={trueAnswer}
            onChange={handleTrueAnswerChange}
            label="Correct Answer"
          >
            <MenuItem value={questionAnswerList[number - 1].options[0].content}>{questionAnswerList[number - 1].options[0].content}</MenuItem>
            <MenuItem value={questionAnswerList[number - 1].options[1].content}>{questionAnswerList[number - 1].options[1].content}</MenuItem>
            <MenuItem value={questionAnswerList[number - 1].options[2].content}>{questionAnswerList[number - 1].options[2].content}</MenuItem>
            <MenuItem value={questionAnswerList[number - 1].options[3].content}>{questionAnswerList[number - 1].options[3].content}</MenuItem>
          </Select>
            : 
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={trueAnswer}
            onChange={handleTrueAnswerChange}
            label="Correct Answer"
          >
            <MenuItem value={0}>0</MenuItem>
          </Select>
          }
        </FormControl>
      </Grid>

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
