interface Quiz {
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

export default Quiz;