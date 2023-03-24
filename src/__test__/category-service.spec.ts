import categoryService from "../services/category-service";
import http from "../http-common"

jest.mock("../http-common");

describe("Category Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should get all categories", async () => {
    const mockedResponse = {
      data: {
        message: "All categories",
        data: [],
        meta: [],
      }
    };

    (http.get as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await categoryService.getAll();

    expect(http.get).toHaveBeenCalledWith("/category/all");
    expect(result.data).toEqual(mockedResponse);
  });

  it("should get category by title", async () => {
    const data = "title";

    const mockedResponse = {
      data: {
        message: "Category by title",
        data: [],
      }
    };

    (http.get as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await categoryService.getByTitle(data);

    expect(http.get).toHaveBeenCalledWith(`/category?title=${data}`);
    expect(result.data).toEqual(mockedResponse);
  });

  it("should create category", async () => {
    const data = {
      title: "title",
      description: "description",
    }

    const mockedResponse = {
      data: {
        message: "Category created",
        data: [],
      }
    };

    (http.post as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await categoryService.create(data);

    expect(http.post).toHaveBeenCalledWith("/category", data);
    expect(result).toEqual(mockedResponse);
  });

  it("should update category", async () => {
    const data = 1

    const mockedResponse = {
      data: {
        message: "Category updated",
        data: [],
      }
    };

    (http.put as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await categoryService.update(data);

    expect(http.put).toHaveBeenCalledWith(`/category/:${data}`);
    expect(result.data).toEqual(mockedResponse);
  });

  it("should delete category", async () => {
    const id = 1;

    const mockedResponse = {
      data: {
        message: "Category deleted",
        data: [],
      }
    };

    (http.delete as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await categoryService.delete(id);

    expect(http.delete).toHaveBeenCalledWith(`/category/:${id}`);
    expect(result.data).toEqual(mockedResponse);
  });
});