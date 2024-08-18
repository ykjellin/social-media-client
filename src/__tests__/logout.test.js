import { logout } from "../js/api/auth/logout";
import * as storage from "../js/storage/index";

jest.mock("../js/storage/index", () => ({
  remove: jest.fn(),
}));

describe("logout function", () => {
  beforeEach(() => {
    storage.remove.mockClear();
  });

  it("should clear the token from storage on logout", () => {
    logout();

    expect(storage.remove).toHaveBeenCalledWith("token");
    expect(storage.remove).toHaveBeenCalledWith("profile");
  });
});
