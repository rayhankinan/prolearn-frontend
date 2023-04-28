import jobsService from "@/services/jobs-service";
import http from "../http-common";

jest.mock("../http-common");

describe("Jobs Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should get status", async () => {
    const id = 1;

    const mockedResponse = {
      data: {
        message: "Jobs Status",
        data: [],
      }
    };

    (http.get as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await jobsService.getStatus(id);

    expect(http.get).toHaveBeenCalledWith(`/jobs/${id}`);
    expect(result).toEqual(mockedResponse);
  });

  it("should run jobs", async () => {
    const data = {
      jobs: []
    }

    const mockedResponse = {
      data: {
        message: "Jobs submitted",
        data: [],
      }
    };

    (http.post as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await jobsService.runJobs(data);

    expect(http.post).toHaveBeenCalledWith("/jobs", data);
    expect(result).toEqual(mockedResponse);
  });
});