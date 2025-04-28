import { describe, it, expect } from "vitest";
import app from "../../src/index";

describe("register", () => {
  it("should register a user", async () => {
    const user = {
      username: "admin1",
      password: "Password123",
      role: "admin",
      email: "hello@work.com",
    };

    const response = await app.request("/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status).toBe(201);
  });

  it("should not register an existing user", async () => {
    const user = {
      username: "admin1",
      password: "Password123",
      role: "admin",
      email: "hello@work.com",
    };

    const response = await app.request("/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status).toBe(400);
    expect(response.json()).resolves.toEqual({
      error: "Nom d'utilisateur déjà pris",
    });
  });

  it("should not register a user with wrong body", async () => {
    const user = {
      username: "admin1",
      password: "Password123",
    };

    const response = await app.request("/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    expect(response.status).toBe(400);
    expect(json.success).toEqual(false);
  });
});

describe("login", () => {
  it("should login a user", async () => {
    const user = {
      username: "admin1",
      password: "Password123",
    };

    const response = await app.request("/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status).toBe(200);
  });

  it("should not login a user with wrong password", async () => {
    const user = {
      username: "admin1",
      password: "test",
    };

    const response = await app.request("/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status).toBe(401);
    expect(response.json()).resolves.toEqual({
      error: "Mot de passe incorrect",
    });
  });

  it("should not login a user with wrong username", async () => {
    const user = {
      username: "admin2",
      password: "Password123",
    };

    const response = await app.request("/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status).toBe(404);
    expect(response.json()).resolves.toEqual({
      error: "Utilisateur non trouvé",
    });
  });

  it("should not login a user with wrong body", async () => {
    const user = {
      username: "admin1",
    };

    const response = await app.request("/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    expect(response.status).toBe(400);
    expect(json.success).toEqual(false);
  });
});

describe("refresh-token", () => {
  it("should refresh a valid refresh token", async () => {
    const user = {
      username: "admin1",
      password: "Password123",
    };

    const response = await app.request("/login", {
      method: "POST",
      body: JSON.stringify(user),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json.accessToken).toBeDefined();
    expect(json.refreshToken).toBeDefined();

    const refreshResponse = await app.request("/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: json.refreshToken,
      }),
    });

    const refreshJson = await refreshResponse.json();
    expect(refreshResponse.status).toBe(200);
    expect(refreshJson.accessToken).toBeDefined();
    expect(refreshJson.refreshToken).toBeDefined();
  });

  it("should not refresh an invalid refresh token", async () => {
    const refreshResponse = await app.request("/refresh-token", {
      method: "POST",
      body: JSON.stringify({
        refreshToken: "invalid",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(refreshResponse.status).toBe(401);
    expect(refreshResponse.json()).resolves.toEqual({
      error: "Refresh token invalide",
    });
  });
});

describe("logout", () => {
  it("should logout a user", async () => {
    const user = {
      username: "admin1",
      password: "Password123",
    };

    const response = await app.request("/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json.accessToken).toBeDefined();
    expect(json.refreshToken).toBeDefined();

    const logoutResponse = await app.request("/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
      },
    });

    expect(logoutResponse.status).toBe(200);
  });
});
