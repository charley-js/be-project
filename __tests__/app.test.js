const testData = require("../db/data/test-data/index");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const app = require("../app/app");
const request = require("supertest");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  console.log("Seeding Test Database...");
  return seed(testData);
});

describe("GET /api/topics", () => {
  test("GET:200 - Responds with an array of all the topic objects, with slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(3);
        body.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("GET:404 - Responds with an error message of Invalid endpoint if the endpoint is incorrect", () => {
    return request(app)
      .get("/api/topic")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid endpoint");
      });
  });
});
