const state = {
  token: "-1",
  UserType: 1,
}

const getters = {
  token(state) {
    return state.token;
  },
  log(state) {
    return state.token != "-1";
  },
  UserType(state) {
    if (state.token == "-1")
      return 114514;
    else
      return state.UserType;
  },
}

const mutations = {
  set_token(state, token) {
    state.token = token;
  },
  set_UserType(state, UserType) {
    console.log(UserType);
    state.UserType = UserType;
  },
}

const actions = {
  set_token(context, args) {
    context.commit('set_token', args);
  },
  set_UserType({ commit }, data) {
    commit("set_UserType", data);
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
