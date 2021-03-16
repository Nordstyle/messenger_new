import { createStore, createEvent } from "effector";
import { MessengerProps } from "../components/Messenger";

export const setSettings = createEvent<Nullable<MessengerProps>>(
  "Set global settings messenger"
);

export const $Settings = createStore<Nullable<MessengerProps>>(null).on(
  setSettings,
  (_, settings) => settings
);
