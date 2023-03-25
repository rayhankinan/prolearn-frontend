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

type lQ = {
  number: number;
  question: string;
}

type lA = {
  number: number;
  answer: [
    { a: string; isCorrect: boolean },
    { b: string; isCorrect: boolean },
    { c: string; isCorrect: boolean },
    { d: string; isCorrect: boolean }
  ]
}

interface AddSectionModalProps {
  material?: Section;
  courseId: string;
}

let listQuestion: lQ[] = [];
for (let i = 0; i < 2; i++) {
  listQuestion[i] = {
    number: (i + 1),
    question: " ",
  };
}
console.log(listQuestion);

let answerList: lA[] = [];
for (let i = 0; i < 2; i++) {
  answerList[i] = {
    number: (i + 1),
    answer: [
      {
        a: " ", isCorrect: false
      },
      {
        b: " ", isCorrect: false
      },
      {
        c: " ", isCorrect: false
      },
      {
        d: " ", isCorrect: false
      },
    ]
  };
}
console.log(answerList);

const AddSectionModal = ({ 
  material, courseId }: AddSectionModalProps) => {


  const [name, setName] = useState(material?.title || "");
  const [body, setBody] = useState(" ");
  const [duration, setDuration] = useState(material?.duration || 0);
  const [objective, setObjective] = useState(material?.objective || "");
  const [quiz, setQuiz] = useState(material?.quiz || "");
  const [countQuestion, setCountQuestion] = useState(0);
  const [number, setNumber] = useState(listQuestion[0].number);
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
    // for (let i = 0; i < 3; i++) {
    //   listQuestion[i] = {
    //     number: "Question " + (i + 1),
    //     question: " ",
    //   };
    // }
    // console.log(listQuestion);
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
    listQuestion[number - 1].question = question;
    console.log(listQuestion);
  }

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  }

  const handleAddAnswer = () => {
    // always add to the first choice if not " "
    if (answerList[number - 1].answer[0].a == " ") {
      answerList[number - 1].answer[0].a = answer;
    } else if (answerList[number - 1].answer[1].b == " ") {
      answerList[number - 1].answer[1].b = answer;
    } else if (answerList[number - 1].answer[2].c == " ") {
      answerList[number - 1].answer[2].c = answer;
    } else if (answerList[number - 1].answer[3].d == " ") {
      answerList[number - 1].answer[3].d = answer;
    } else {
      console.log("full");
    }

    console.log(answerList);
  }

  const handleTrueAnswerChange = (event: any) => {
    if (answerList[number - 1].answer[0].a == event.target.value) {
      answerList[number - 1].answer[0].isCorrect = true;
    } else if (answerList[number - 1].answer[1].b == event.target.value) {
      answerList[number - 1].answer[1].isCorrect = true;
    } else if (answerList[number - 1].answer[2].c == event.target.value) {
      answerList[number - 1].answer[2].isCorrect = true;
    } else if (answerList[number - 1].answer[3].d == event.target.value) {
      answerList[number - 1].answer[3].isCorrect = true;
    }

    console.log(answerList);
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
        description: quiz,
        question: [
          {
            content: listQuestion[0].question,
            option: [
              {
                content: answerList[0].answer[0].a,
                isCorrect: answerList[0].answer[0].isCorrect
              },
              {
                content: answerList[0].answer[1].b,
                isCorrect: answerList[0].answer[1].isCorrect
              },
              {
                content: answerList[0].answer[2].c,
                isCorrect: answerList[0].answer[2].isCorrect
              },
              {
                content: answerList[0].answer[3].d,
                isCorrect: answerList[0].answer[3].isCorrect
              }
            ]
          },
          {
            content: listQuestion[1].question,
            option: [
              {
                content: answerList[1].answer[0].a,
                isCorrect: answerList[1].answer[0].isCorrect
              },
              {
                content: answerList[1].answer[1].b,
                isCorrect: answerList[1].answer[1].isCorrect
              },
              {
                content: answerList[1].answer[2].c,
                isCorrect: answerList[1].answer[2].isCorrect
              },
              {
                content: answerList[1].answer[3].d,
                isCorrect: answerList[1].answer[3].isCorrect
              }
            ]
          },
        ]
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
            <MenuItem value={listQuestion[0].number}>{listQuestion[0].number}</MenuItem>
            <MenuItem value={listQuestion[1].number}>{listQuestion[1].number}</MenuItem>
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
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={answer}
            onChange={handleTrueAnswerChange}
            label="Correct Answer"
          >
            <MenuItem value={answerList[number - 1].answer[0].a}>{answerList[number - 1].answer[0].a}</MenuItem>
            <MenuItem value={answerList[number - 1].answer[1].b}>{answerList[number - 1].answer[1].b}</MenuItem>
            <MenuItem value={answerList[number - 1].answer[2].c}>{answerList[number - 1].answer[2].c}</MenuItem>
            <MenuItem value={answerList[number - 1].answer[3].d}>{answerList[number - 1].answer[3].d}</MenuItem>
          </Select>
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
