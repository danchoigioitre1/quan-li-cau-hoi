export const mutations = {
  setName(state, name) {
    state.name = name;
  },
  setExerciseMode(state, mode) {
    state.exerciseMode = mode;
  },
  setExerciseList(state, list) {
    state.exerciseList = list;
  },
  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
  setGradeList(state, gradeList) {
    state.gradeList = gradeList;
  },
  setSubjectList(state, subjectList) {
    state.subjectList = subjectList;
  },

  deleteExercise(state, id) {
    state.exerciseList = state.exerciseList.filter(
      (record) => record.id !== id
    );
  },

  addExercise(state, newRecord) {
    state.exerciseList.push(newRecord);
  },

  setQuestionList(state, list) {
    state.questions = list;
  },

  setExerciseSelectedId(state, id) {
    state.exerciseSelectedId = id;
  },

  deleteQuestion(state, id) {
    state.questions = state.questions.filter((record) => record.id !== id);
  },

  setSelectedQuestion(state, question) {
    state.questionSelected = question;
  },

  setQuestionMode(state, mode) {
    state.questionMode = mode;
  },

  updateQuestion(state, updatedData) {
    const index = state.questions.findIndex(
      (record) => record.questionId === updatedData.questionId
    );
    if (index !== -1) {
      state.data.splice(index, 1, updatedData);
    }
  },

  setExerciseSelected(state, exercise) {
    state.exerciseSelected = exercise;
  },
};
