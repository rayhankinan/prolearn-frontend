import recommendService from "../services/recommend-service";
import http from "../http-common"

jest.mock("../http-common");

describe("Recommend Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should get recommend", async () => {
    const id = 1;

    const mockedResponse = {
      data: {
        message: "Recommendation",
        data: [],
      }
    };

    (http.get as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await recommendService.getRecommendation();

    expect(http.get).toHaveBeenCalledWith("/recommendation/collaborative");
    expect(result.data).toEqual(mockedResponse);
  });
});