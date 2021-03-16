import { createEvent, createStore } from "effector";

export const setButtonActive = createEvent<boolean>("Set button active status");

export const $ButtonActive = createStore<boolean>(false).on(
  setButtonActive,
  (_, state) => state
);
