import fileService from "../services/file-service";
import http from "../http-common"

jest.mock("../http-common");

describe("File Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
    
  it("should get file", async () => {
    const id = 1;
    const mockedResponse = new Blob(['Test Blob'], {type: "text/plain"});

    (http.get as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await fileService.getFile(id);

    expect(http.get).toHaveBeenCalledWith(`/file/${id}`, { responseType: "blob" });
    expect(result.data).toEqual(mockedResponse);
  });

  it("should get hmtl file", async () => {
    const id = 1;
    const mockedResponse = {
      data: {
        message: "File",
        data: [],
      }
    };

    (http.get as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await fileService.getHTMLFile(id);

    expect(http.get).toHaveBeenCalledWith(`/file/${id}`);
    expect(result.data).toEqual(mockedResponse);
  });
});