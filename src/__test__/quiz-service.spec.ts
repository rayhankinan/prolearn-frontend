import quizService from "../services/quiz-service";
import http from "../http-common"

jest.mock("../http-common");

describe("Quiz Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should submit quiz", async () => {
    const id = 1;

    const data = {
      quizId: 1,
      answer : []
    }

    const mockedResponse = {
      data: {
        message: "Quiz submitted",
        data: [],
      }
    };

    (http.post as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await quizService.submitQuiz(id, data);

    expect(http.post).toHaveBeenCalledWith(`/quiz/${id}`, data);
    expect(result).toEqual(mockedResponse);
  });

  it("should view history", async () => {
    const id = 1;

    const mockedResponse = {
      data: {
        message: "Quiz history",
        data: [],
      }
    };

    (http.get as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await quizService.viewHistory(id);

    expect(http.get).toHaveBeenCalledWith(`/quiz/${id}`);
    expect(result.data).toEqual(mockedResponse);
  });
});