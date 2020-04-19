import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
};

export const mutations = {
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
};

export const actions = {
  createEvent({ commit, rootState }, event) {
    console.log(`User creating Event is ${rootState.user.user.name}`);
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
};

export const getters = {
  categoriesLengthGetter: state => {
    return state.categories.length;
  },
  getEventById: state => id => {
    return state.events.find(event => (event.id = id));
  }
};
