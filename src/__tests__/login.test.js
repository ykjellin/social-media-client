import { login } from "../js/api/auth/login";
import * as storage from "../js/storage/index";

jest.mock("../js/storage/index", () => ({
  save: jest.fn(),
  load: jest.fn(),
}));

global.fetch = jest.fn();

describe("login function", () => {
  beforeEach(() => {
    fetch.mockClear();
    storage.save.mockClear();
    storage.load.mockClear();
  });

  it("should login successfully with valid credentials", async () => {
    const mockProfile = {
      name: "Bob",
      email: "Bob@noroff.no",
      accessToken: "fake-token",
    };

    storage.load.mockReturnValueOnce("some-token");

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    });

    const profile = await login("Bob@noroff.no", "password123");

    expect(profile).toEqual({
      name: "Bob",
      email: "Bob@noroff.no",
    });

    expect(storage.save).toHaveBeenCalledWith("token", "fake-token");
    expect(storage.save).toHaveBeenCalledWith("profile", {
      name: "Bob",
      email: "Bob@noroff.no",
    });
  });

  it("should throw an error for invalid credentials", async () => {
    storage.load.mockReturnValueOnce(null);
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
    });

    await expect(login("Bob@bullsheet.no", "wrongpassword")).rejects.toThrow(
      "Unauthorized",
    );
  });
});
