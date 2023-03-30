import quizService from "../services/quiz-service";
import http from "../http-common"

jest.mock("../http-common");

describe("Quiz Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should submit quiz", async () => {
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

    const result = await quizService.submitQuiz(data);

    expect(http.post).toHaveBeenCalledWith("/quiz", data);
    expect(result).toEqual(mockedResponse);
  });
});