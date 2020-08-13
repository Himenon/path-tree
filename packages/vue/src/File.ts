import Vue from "vue";

export interface Props {
  path: string;
  name: string;
  level: number;
}

export const Component = Vue.extend<Props>({
  name: "File",
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  },
  functional: true,
  render: function (createElement, { props }) {
    return createElement("p", { class: "tree-item file-item" }, props.name);
  },
});

export type ComponentType = Vue.Component<unknown, unknown, unknown, Props>;
