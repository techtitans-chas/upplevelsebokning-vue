import { defineStore } from "pinia";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useDestinationStore = defineStore("destination", {
  state: () => ({
    items: [
      {
        id: 1, title: "Ancient Greece",
        price: 500,
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae nobis mollitia ullam, ea tempora possimus soluta adipisci esse consectetur dolores ipsum ducimus error veritatis obcaecati rerum, facilis velit expedita vel."
      },
      {
        id: 2, title: "Egypt",
        price: 750,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque doloribus itaque dolorem inventore. Voluptatibus dolore ipsa debitis! Incidunt, assumenda! Odio suscipit reprehenderit qui debitis illum molestiae corporis optio eum voluptas."
      },
      {
        id: 3, title: "Jupiter",
        price: 750000,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque doloribus itaque dolorem inventore. Voluptatibus dolore ipsa debitis! Incidunt, assumenda! Odio suscipit reprehenderit qui debitis illum molestiae corporis optio eum voluptas."
      }
    ]
  }),
  getters: {
    getById: (state) => (id: number) => {
      return state.items.find(i => i.id === id);
    },
  },
  actions: {

  },
});
