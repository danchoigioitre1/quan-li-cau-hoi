import axios from "axios";

export const BASE_URL = "https://localhost:7235/api/v1";
export const GET_EXERCISE_LIST = "Exercises/getExerciseList";
export const SUBJECT = "Subjects";
export const GRADE = "Grades";
export const EXERCISE = "Exercises";
export const CREATE_EXERCISE = "Exercises/create";
export const CREATE_QUESTION = "Questions/create";
export const CREATE_MULTIPLE_ANSWER = "Answers/createMultiple";
export const GET_QUESTION_LIST = "Questions/getQuestionList";
export const QUESITON = "Questions";
export const UPDATE_QUESITON = "Questions/update";
export const MULTIPLE_DELETE_ANSWER = "Answers/deleteMultipleAnswer";
export const EXERCISE_CHANGE_STATUS = "Exercises/ChangeStatusExercise";

export function getExercise(filters) {
  const newFilter = { ...filters };
  ["pageSize", "pageNumber"].forEach((key) => delete newFilter[key]);
  var response = axios.post(
    `${BASE_URL}/${GET_EXERCISE_LIST}?pageSize=${filters.pageSize}&pageNumer=${filters.pageNumber}`,
    newFilter
  );
  return response;
}

export async function getSubject() {
  var response = await axios.get(`${BASE_URL}/${SUBJECT}`);
  return response;
}

export function getGrade() {
  var response = axios.get(`${BASE_URL}/${GRADE}`);
  return response;
}

export function deleteExercise(id) {
  var response = axios.delete(`${BASE_URL}/${EXERCISE}/${id}`);
  return response;
}

export function createExercise(exercise) {
  var response = axios.post(`${BASE_URL}/${CREATE_EXERCISE}`, exercise);
  return response;
}

export function createQuestion(question) {
  var response = axios.post(`${BASE_URL}/${CREATE_QUESTION}`, question);
  return response;
}
export function createMultipleAnswer(answers) {
  var response = axios.post(`${BASE_URL}/${CREATE_MULTIPLE_ANSWER}`, answers);
  return response;
}

export function getQuestions(id) {
  var response = axios.post(
    `${BASE_URL}/${GET_QUESTION_LIST}?exerciseId=${id}`
  );
  return response;
}

export function deleteQuestion(id) {
  var response = axios.delete(`${BASE_URL}/${QUESITON}/${id}`);
  return response;
}

export function updateQuestion(question) {
  var id = question.questionId;
  delete question.questionId;
  var response = axios.post(
    `${BASE_URL}/${UPDATE_QUESITON}?id=${id}`,
    question
  );
  return response;
}

export function multipleDeleteAnswer(ids) {
  var response = axios.post(`${BASE_URL}/${MULTIPLE_DELETE_ANSWER}`, ids);
  return response;
}

export function changeExerciseStatus(id) {
  var response = axios.post(`${BASE_URL}/${EXERCISE_CHANGE_STATUS}/?id=${id}`);
  return response;
}
