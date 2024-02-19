const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  test('It should respond with a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello LRNR!');
  });
});

describe('GET /questions', () => {
  test('It should respond with generated questions', async () => {
    const response = await request(app)
      .get('/questions')
      .query({ topic: 'Math', expertise: 'beginner', numQuestions: 5, style: 'friendly' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('Questions');
    expect(response.body.Questions).toHaveLength(5);
  });
});

describe('POST /questions', () => {
  test('It should respond with a success message after submitting questions', async () => {
    const questions = [{ question: 'What is 2 + 2?' }, { question: 'What is the capital of France?' }];
    const response = await request(app).post('/questions').send(questions);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Questions submitted successfully' });
  });
});

describe('GET /evaluation', () => {
  test('It should respond with an evaluation of the submission', async () => {
    const response = await request(app)
      .get('/evaluation')
      .query({ question: 'What is the capital of France?', submission: 'Paris' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('evaluation');
    expect(response.body).toHaveProperty('explanation');
  });
});
