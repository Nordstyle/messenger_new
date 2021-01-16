import { createStore, createEvent } from "effector";

export const setMode = createEvent<boolean>("onChange size mode");
export const setSize = createEvent<number>("set size current mode");
export const resetSizes = createEvent("reset sizes");

export const $widthSettings = createStore({
  isFull: false,
  containerWidth: 768,
})
  .on(setSize, (state, size) => ({
    ...state,
    containerWidth: size,
  }))
  .on(setMode, (state, mode) => ({
    ...state,
    isFull: mode,
  }));

// sample($isFullMode, $sizes, (isFullMode, size) => {
//   if (!isFullMode) setSize(768);
//   return size;
// });

// $widthSettings.watch((widthSettings) => console.log({ widthSettings }));
// $sizes.watch((sizes) => console.log({ sizes }));
