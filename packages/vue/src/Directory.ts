import Vue from "vue";

export interface Data {
  isActive: boolean;
}

export interface Methods {
  toggle: () => void;
}

export interface Computed {}

export interface Props {
  path: string;
  name: string;
  level: number;
}

export const Component = Vue.extend<Data, Methods, Computed, Props>({
  name: "Directory",
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
  methods: {
    toggle: function () {
      this.isActive = !this.isActive;
    },
  },
  data: function (): Data {
    return {
      isActive: true,
    };
  },
  render(createElement) {
    return createElement("ul", { class: "tree-item directory" }, [
      createElement(
        "li",
        {
          class: "directory-item",
          attrs: {
            "data-open": `${this.isActive}`,
          },
        },
        [
          createElement(
            "span",
            {
              class: "directory-item-name",

              on: {
                click: () => {
                  this.toggle();
                },
              },
            },
            this.$props.name,
          ),
        ],
      ),
      this.isActive && this.$slots.default,
    ]);
  },
});

export type ComponentType = Vue.Component<Data, Methods, Computed, Props>;
