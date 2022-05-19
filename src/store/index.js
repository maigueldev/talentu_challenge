import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

function generateAge(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default new Vuex.Store({
  state: {
    data: [],
    statusCreate: {
      error: false,
      success: false,
    },
  },
  getters: {
    getData: function (state) {
      return state.data;
    },
    getStatusCreate: function (state) {
      return state.statusCreate;
    },
    getHasError: function (state) {
      return state.statusCreate.error;
    },
    getHasSuccess: function (state) {
      return state.statusCreate.success;
    },
  },
  mutations: {
    setData: function (state, data) {
      state.data = data;
    },
    setStatusCreate: function (state, value) {
      state.statusCreate = value;
    },
  },
  actions: {
    getDataList: async function () {
      const URL = "https://reqres.in/api/users?page=1";

      await axios.get(URL).then((response) => {
        const data = response.data.data;
        let users = [];
        if (data) {
          data.forEach((element) => {
            users.push(Object.assign(element, { age: generateAge(15, 40) }));
          });
          this.commit("setData", users);

          return;
        }

        this.commit("setData", []);
      });
    },
    setErrorCreate: function () {
      const status = { error: true, success: false };

      this.commit("setStatusCreate", status);
    },
    setSuccessCreate: function () {
      const status = { error: false, success: true };

      this.commit("setStatusCreate", status);
    },
  },
});
