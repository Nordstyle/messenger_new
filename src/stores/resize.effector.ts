import { createStore, createEvent } from "effector";

export const setMode = createEvent<boolean>("onChange size mode");
export const setSize = createEvent<number>("set size current mode");
export const resetSizes = createEvent("reset sizes");

export const $widthSettings = createStore({
  isFull: false,
  containerWidth: 776,
})
  .on(setSize, (state, size) => ({
    ...state,
    containerWidth: size,
  }))
  .on(setMode, (state, mode) => ({
    ...state,
    isFull: mode,
  }));
