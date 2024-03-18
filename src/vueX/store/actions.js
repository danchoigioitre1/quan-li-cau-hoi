import {
  getExercise,
  getSubject,
  getGrade,
  deleteExercise,
  createExercise,
  createQuestion,
  getQuestions,
  deleteQuestion,
  updateQuestion,
  multipleDeleteAnswer,
  changeExerciseStatus,
} from "@/js/service/api";

export const actions = {
  updateName({ commit }) {
    commit("setName", "Nguyen viet anh");
  },
  setExerciseSelectedId({ commit }, id) {
    commit("setExerciseSelectedId", id);
  },
  setExerciseMode({ commit }, mode) {
    commit("setExerciseMode", mode);
  },

  getExerciseList({ commit }, filters) {
    getExercise(filters)
      .then((res) => {
        commit("setExerciseList", res.data), commit("setLoading", false);
      })
      .catch((err) => console.log(err));
  },

  getSubjectList({ commit }) {
    commit("setLoading", true);
    getSubject()
      .then((res) => {
        var dto = res.data.map((item) => {
          return {
            id: item.subjectId,
            value: item.subjectName,
          };
        });
        commit("setSubjectList", dto), commit("setLoading", false);
      })
      .catch((err) => console.log(err));
  },

  getGradeList({ commit }) {
    commit("setLoading", true);
    getGrade()
      .then((res) => {
        var dto = res.data.map((item) => {
          return {
            id: item.gradeId,
            value: item.gradeName,
          };
        });
        commit("setGradeList", dto), commit("setLoading", false);
      })
      .catch((err) => console.log(err));
  },

  deleteExerciseById({ commit }, id) {
    deleteExercise(id)
      .then(() => {
        commit("deleteExercise", id);
      })
      .catch((err) => console.log(err));
  },

  createExercise({ commit }, exercise) {
    createExercise(exercise)
      .then((response) => {
        commit("addExercise", { exerciseId: response.data, ...exercise });
        return response.data;
      })
      .catch((err) => console.log(err));
  },

  createQuestion({ commit }, question) {
    createQuestion(question)
      .then((response) => {
        console.log(commit);
        return response.data;
      })
      .catch((err) => console.log(err));
  },

  getQuestionList({ commit }, id) {
    getQuestions(id)
      .then((response) => {
        commit("setQuestionList", convertDataToDTO(response.data));
      })
      .catch((err) => console.log(err));
  },

  deleteQuestionById({ commit }, idList) {
    deleteQuestion(idList.questionId)
      .then(() => {
        getQuestions(idList.exerciseId)
          .then((response) => {
            commit("setQuestionList", convertDataToDTO(response.data));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },

  setQuestionSelected({ commit }, question) {
    commit("setSelectedQuestion", question);
  },

  setQuestionMode({ commit }, mode) {
    commit("setQuestionMode", mode);
  },

  updateQuestionById({ commit }, question) {
    updateQuestion(question)
      .then(() => {
        commit("updateQuestion", question);
        getQuestions(question.exerciseId)
          .then((response) => {
            commit("setQuestionList", convertDataToDTO(response.data));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },

  deleteAnswers({ commit }, ids) {
    multipleDeleteAnswer(ids)
      .then(() => {
        console.log(commit);
      })
      .catch((err) => console.log(err));
  },

  setExerciseSelected({ commit }, exercise) {
    commit("setExerciseSelected", exercise);
  },

  completeExercise({ commit }, id) {
    changeExerciseStatus(id)
      .then(() => {
        getExercise({
          pageSize: 6,
          pageNumber: 1,
        })
          .then((res) => {
            commit("setExerciseList", res.data), commit("setLoading", false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
};

function convertDataToDTO(questions) {
  var listIdDup = questions.map((item) => item.questionId);
  const uniqueSet = new Set(listIdDup);
  const listId = [...uniqueSet];
  const newQuestion = [];
  for (var k = 0; k < listId.length; k++) {
    newQuestion.push({ answerList: [] });
  }
  for (var i = 0; i < listId.length; i++) {
    for (var j = 0; j < questions.length; j++) {
      if (listId[i] == questions[j].questionId) {
        newQuestion[i].questionId = listId[i];
        newQuestion[i].questionContent = questions[j].questionContent;
        newQuestion[i].questionNote = questions[j].questionNote;
        newQuestion[i].questionType = questions[j].typeQuestion;
        newQuestion[i].answerList.push({
          id: questions[j].answerId,
          value: questions[j].answerContent,
          isTrue: questions[j].answerStatus,
        });
      }
    }
  }
  return newQuestion;
}
