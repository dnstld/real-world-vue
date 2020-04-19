import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";
import * as user from "@/store/modules/user.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ],
    events: [],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_TOTAL_EVENTS(state, total) {
      state.eventsTotal = total;
    },
    SET_EVENT(state, event) {
      state.event = event;
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit("SET_TOTAL_EVENTS", response.headers["x-total-count"]);
          commit("SET_EVENTS", response.data);
        })
        .catch(error => {
          console.log("There was an error: " + error.response);
        });
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id);

      if (event) {
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit("SET_EVENT", response.data);
          })
          .catch(error => {
            console.log("There was an error: " + error);
          });
      }
    }
  },
  modules: {
    user
  },
  getters: {
    categoriesLengthGetter: state => {
      return state.categories.length;
    },
    getEventById: state => id => {
      return state.events.find(event => (event.id = id));
    }
  }
});
