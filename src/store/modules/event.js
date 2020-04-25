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
  createEvent({ commit, rootState, dispatch }, event) {
    console.log(`User creating Event is ${rootState.user.user.name}`);
    dispatch("moduleName/actionToCall", null, { root: true });

    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);

        const notification = {
          type: "success",
          message: "Your event has benn created"
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: `There was a problem creating your event: ${error.message}`
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit("SET_TOTAL_EVENTS", response.headers["x-total-count"]);
        commit("SET_EVENTS", response.data);
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: `There was a problem fetching events: ${error.message}`
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    const event = getters.getEventById(id);

    if (event) {
      commit("SET_EVENT", event);
      return event;
    } else {
      return EventService.getEvent(id)
        .then(response => {
          commit("SET_EVENT", response.data);
          return response.data;
        })
        .catch(error => {
          const notification = {
            type: "error",
            message: `There was a problem fetching event: ${error.message}`
          };
          dispatch("notification/add", notification, { root: true });
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
