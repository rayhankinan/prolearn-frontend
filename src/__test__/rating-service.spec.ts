import ratingService from "../services/rating-service";
import http from "../http-common"

jest.mock("../http-common");

describe("Rating Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create rating", async () => {
    const data = {
      courseId: 1,
      rating: 5,
    }

    const mockedResponse = {
      data: {
        message: "Rating submitted",
        data: [],
      }
    };

    (http.post as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await ratingService.create(data);

    expect(http.post).toHaveBeenCalledWith("/rating", data);
    expect(result.data).toEqual(mockedResponse);
  });

  it("should get rating", async () => {
    const id = 1;

    const mockedResponse = {
      data: {
        message: "Rating",
        data: [],
      }
    };

    (http.get as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await ratingService.get(id);

    expect(http.get).toHaveBeenCalledWith(`/rating/${id}`);
    expect(result.data).toEqual(mockedResponse);
  });
});