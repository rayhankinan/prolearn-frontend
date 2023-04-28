import sectionService from "../services/section-service";
import http from "../http-common"

jest.mock("../http-common");

describe("Section Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should get sections by course id", async () => {
    const id = "1";

    const mockedResponse = {
      data: {
        message: "Sections by course id",
        data: [],
      }
    };

    (http.get as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await sectionService.getSectionByCourse(id);

    expect(http.get).toHaveBeenCalledWith(`/section/${id}`);
    expect(result.data).toEqual(mockedResponse);
  });

  it("should search sections by title", async () => {
    const params = {
      title: "title",
    }

    const mockedResponse = {
      data: {
        message: "Sections by title",
        data: [],
      }
    };

    (http.get as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await sectionService.searchSectionsByTitle(params);

    expect(http.get).toHaveBeenCalledWith("/section", { params });
    expect(result.data).toEqual(mockedResponse);
  });

  it("should create section", async () => {
    const data = {
      title: "title",
      description: "description",
      courseId: "1",
    }

    const mockedResponse = {
      data: {
        message: "Section created",
        data: [],
      }
    };

    (http.post as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await sectionService.create(data);

    expect(http.post).toHaveBeenCalledWith("/section", data);
    expect(result).toEqual(mockedResponse);
  });

  it("should update section", async () => {
    const data = {
      title: "title",
      description: "description",
      courseId: "1",
    }

    const id = "1";

    const mockedResponse = {
      data: {
        message: "Section updated",
        data: [],
      }
    };

    (http.put as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await sectionService.update(id, data);

    expect(http.put).toHaveBeenCalledWith(`/section/${id}`, data);
    expect(result).toEqual(mockedResponse);
  });

  it("should delete section", async () => {
    const id = 1;

    const mockedResponse = {
      data: {
        message: "Section deleted",
        data: [],
      }
    };

    (http.delete as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await sectionService.delete(id);

    expect(http.delete).toHaveBeenCalledWith(`/section/${id}`);
    expect(result.data).toEqual(mockedResponse);
  });
});