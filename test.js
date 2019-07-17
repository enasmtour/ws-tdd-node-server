const test = require('tape');
const router = require('./router');
const supertest = require('supertest');

test('Initialise', (t) => {
  let num = 2;
  t.equal(num, 2, 'Should return 2');
  t.end();
})

test('Home route', (t) => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err)
      t.equal(res.text, 'Hello', 'response should contain \'Hello\'');
      t.end();
    });
});

test("making sure tape is working!", t => {
  t.equal(1, 1, "tape is testing");
  t.end();
});
test("testing home route status code 200", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect({"Content-Type":"application"})
    .end((err, res) => {
      t.equal(res.statusCode, 200, "should be 200");
      t.end();
    });
});


test("testing for 1 ", t => {
  supertest(router)
    .get("/elephants")
    .expect(404)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.equal(res.statusCode, 404, "should return 404");
      t.equal(res.text, "Unknown uri");
      t.end();
    });
});

test("testing for 2 ", t => {
  supertest(router)
    .get("/blog")
    .expect(200)
    .end((err, res) => {
      t.equal(res.statusCode, 200, "should return one,two,three");
      t.deepEqual(res.body, ["one", "two", "three"]);
      t.end();
    });
});

test("testing for3 ", t => {
  supertest(router)
    .post("/blog")
    .send(["a", "b"])
    .set({ password: "potato" })
    .expect(200)
    .expect("content-Type", /json/)
    .end((err, res) => {
      t.equal(res.statusCode, 200, "should return [a,b] ");
      t.deepEqual(res.body, ["a", "b"]);
      t.end();
    });
});

test("testing 4", t => {
  supertest(router)
    .post("/blog")
    .expect(403)
    .end((err, res) => {
      t.equal(res.statusCode, 403, "should return Forbidden");
      t.end();
    });
});

test("testing 5 ", t => {
  supertest(router)
    .post("/blog")
    .set({ password: "potato" })
    .expect(302)
    .expect("Location", "/blog")
     .end((err, res) => {
      t.equal(res.statusCode, 302, "should return Location");
      t.end();
    });
});
