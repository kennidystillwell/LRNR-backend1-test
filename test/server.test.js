const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  //test for getting the root endpoint
  test('It should respond with a welcome message', async () => {
    //sends GET request to the root endpoint
    const response = await request(app).get('/');
    //checks if the response status code is 200 (which means request has been successful)
    expect(response.status).toBe(200);
    //checks if the response text is expected welcome message
    expect(response.text).toBe('Hello LRNR!');
  });
});

describe('GET /questions', () => {
  // test for fetching questions with specified parameters
  test('It should respond with generated questions', async () => {
    //sends a GET request with query parameters to '/questions' endpoint
    const response = await request(app)
      .get('/questions')
      .query({ topic: 'Math', expertise: 'beginner', numQuestions: 5, style: 'friendly' });

    //checks for 200 status code
    expect(response.status).toBe(200);
    //checks if the response body contains a 'questions' property
    expect(response.body).toHaveProperty('Questions');
    //checks if the 'Questions' array length is 5, as requested
    expect(response.body.Questions).toHaveLength(5);
  });
});

describe('POST /questions', () => {
  //test for submitting questions
  test('It should respond with a success message after submitting questions', async () => {
    //defined questions to be submitted for testing
    const questions = [{ question: 'What is 2 + 2?' }, { question: 'What is the capital of France?' }];
    //sends POST request with  questions to the '/questions' endpoint
    const response = await request(app).post('/questions').send(questions);

    //checks for 201 status code (meaning request was successful/new resource was created)
    expect(response.status).toBe(201);
    //checks if  response body matches the expected success message
    expect(response.body).toEqual({ message: 'Questions submitted successfully' });
  });
});

describe('GET /evaluation', () => {
  //test for evaluating a submission
  test('It should respond with an evaluation of the submission', async () => {
    //sends GET request with query parameters to '/evaluation' endpoint
    const response = await request(app)
      .get('/evaluation')
      .query({ question: 'What is the capital of France?', submission: 'Paris' });

    //checks for 200 status code
    expect(response.status).toBe(200);
    //checks if the response body contains an 'evaluation' property
    expect(response.body).toHaveProperty('evaluation');
    //checks if the response body contains an 'explanation' property
    expect(response.body).toHaveProperty('explanation');
  });
});
