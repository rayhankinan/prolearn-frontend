import userService from "../services/user-service";
import http from "../http-common"

jest.mock("../http-common");

describe("User Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should log in", async () => {
    const data = {
      username: "admin",
      password: "admin"
    }

    const mockedResponse = {
      data: {
        message: "Logged in successfully",
        data: "jwt-token",
        meta: null,
        role: "admin"
      }
    };

    (http.post as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await userService.logIn(data);

    expect(http.post).toHaveBeenCalledWith("/user/login", data);
    expect(result).toEqual(mockedResponse);
  });

  it("should register", async () => {
    const data = {
      username: "admin",
      password: "admin"
    }

    const mockedResponse = {
      data: {
        message: "Registered successfully",
        data: {
          username: "admin",
          id: 1,
          role: "admin"
        }
      }
    };

    (http.post as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await userService.register(data);

    expect(http.post).toHaveBeenCalledWith("/user/register", data);
    expect(result).toEqual(mockedResponse);
  });

  it("should subscribe", async () => {
    const id = 1;

    const mockedResponse = {
      data: {
        message: "Subscribed successfully",
        data: {
          id: 1,
          username: "admin",
        }
      }
    };

    (http.post as jest.Mock).mockResolvedValueOnce({ data: mockedResponse });

    const result = await userService.subscribe(id);

    expect(http.post).toHaveBeenCalledWith(`/user/subscribe/${id}`);
    expect(result).toEqual(mockedResponse);
  });
});