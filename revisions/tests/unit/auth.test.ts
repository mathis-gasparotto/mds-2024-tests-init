import { describe, expect, test } from "vitest";
import { authenticateUser } from "../../src/auth/auth";

describe("Auth", () => {
  test("should be able to login", () => {
    const user = authenticateUser("john", "secret");
    expect(user).toBeDefined();
    expect(user).toHaveProperty("id", 1);
    expect(user).toHaveProperty("username", "john");
    expect(user).toHaveProperty("email", "john@example.com");
    expect(user).not.toHaveProperty("password");
  });

  test("should be throw an error if the user is not found", () => {
    expect(() => authenticateUser("wrong", "secret")).toThrow(
      "Utilisateur non trouvé"
    );
  });

  test("should be throw an error if the password is wrong", () => {
    expect(() => authenticateUser("john", "wrong")).toThrow(
      "Mot de passe incorrect"
    );
  });
});
