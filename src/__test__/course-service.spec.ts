import courseService from "../services/course-service";
import http from "../http-common"

jest.mock("../http-common");

describe("Course Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should get all courses", async () => {
    const params = {
      page: 1,
      limit: 10,
      title: "title",
    }

    const mockedResponse = {
      data: {
        message: "All courses",
        data: [],
        meta: [],
      }
    };

    (http.get as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await courseService.getAll(params);

    expect(http.get).toHaveBeenCalledWith("/course", { params });
    expect(result.data).toEqual(mockedResponse);
  });

  it("should get all courses for visitor", async () => {
    const params = {
      page: 1,
      limit: 10,
      title: "title",
    }

    const mockedResponse = {
      data: {
        message: "All courses for visitor",
        data: [],
        meta: [],
      }
    };

    (http.get as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await courseService.getAllForVisitor(params);

    expect(http.get).toHaveBeenCalledWith("/course/visitor", { params });
    expect(result.data).toEqual(mockedResponse);
  });

  it("should get course by id", async () => {
    const id = 1;

    const mockedResponse = {
      data: {
        message: "Course by id",
        data: [],
      }
    };

    (http.get as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await courseService.getById(id);

    expect(http.get).toHaveBeenCalledWith(`/course/${id}`);
    expect(result.data).toEqual(mockedResponse);
  });

  it("should create course", async () => {
    const data: FormData = new FormData();

    const mockedResponse = {
      data: {
        message: "Course created",
        data: [],
      }
    };

    (http.post as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await courseService.create(data);

    expect(http.post).toHaveBeenCalledWith("/course", data);
    expect(result).toEqual(mockedResponse);
  });

  it("should update course", async () => {
    const id = 1;
    const data = {
      title: "title",
      description: "description",
      price: 100,
      category: 1,
    }

    const mockedResponse = {
      data: {
        message: "Course updated",
        data: [],
      }
    };

    (http.put as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await courseService.update(id, data);

    expect(http.put).toHaveBeenCalledWith(`/course/${id}`, data);
    expect(result).toEqual(mockedResponse);
  });

  it("should delete course", async () => {
    const id = 1;

    const mockedResponse = {
      data: {
        message: "Course deleted",
        data: [],
      }
    };

    (http.delete as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await courseService.delete(id);

    expect(http.delete).toHaveBeenCalledWith(`/course/${id}`);
    expect(result.data).toEqual(mockedResponse);
  });
});