export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      required: true
    },
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
