import supertest from "supertest";
import { app } from "../app.js";

const api = supertest(app);

describe("url testing 200", () => {
  it("matching url", async () => {
    const res = await api.get("/about-page");
    expect(res.status).toEqual(200);
  });
});

describe("url testing 404", () => {
  it("unmatching url", async () => {
    const res = await api.get("/test");
    expect(res.status).toEqual(404);
  });
});

describe("content testing", () => {
  it("content matching", async () => {
    const res = await api.get("/about-page");
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    console.log(typeof res.text);
    expect(res.text.indexOf("This is the About page") !== -1).toEqual(true);
  });
});
