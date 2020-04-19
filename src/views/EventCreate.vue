<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.name }}</p>
    <p>There are {{ categoriesLengthGetter }} categories</p>
    <ul>
      <li v-for="categorie in categories" :key="categorie">
        {{ categorie }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["categoriesLengthGetter"]),
    ...mapState(["user", "categories"])
  }
};
</script>

<style scoped></style>
