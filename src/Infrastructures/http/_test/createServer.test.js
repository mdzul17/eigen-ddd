const createServer = require("../createServer");
const request = require("supertest")

let app;

describe("HTTP server", () => {
  it("should response 404 when request unregistered route", async () => {
    app = await createServer()
    const response = await request(app).get('/api/v1/unregisteredRoute')

    expect(response.statusCode).toEqual(404);
  });
});
