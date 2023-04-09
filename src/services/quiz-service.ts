import http from "../http-common";

class QuizService {
  async submitQuiz(id: number, data: any) {
    const response = await http.post(`/quiz/${id}`, data);
    return response.data;
  }

  viewHistory(id: number) {
    return http.get(`/quiz/${id}`);
  }
}

export default new QuizService();