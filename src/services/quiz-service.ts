import http from "../http-common";

class QuizService {
  async submitQuiz(data: any) {
    const response = await http.post("/quiz", data);
    return response.data;
  }
}

export default new QuizService();