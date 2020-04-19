<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.name }}</p>
    <p>There are {{ categoriesLength }} categories</p>
    <ul>
      <li v-for="categorie in categories" :key="categorie">
        {{ categorie }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    categoriesLength() {
      return this.$store.getters.categoriesLengthGetter;
    },
    ...mapState(["user", "categories"])
  }
};
</script>

<style scoped></style>
