import { createStore, createEvent, sample } from "effector";

export const onChangeSizeMode = createEvent<string>("onChange size mode");
export const setSize = createEvent<number>("set size current mode");
export const resetSizes = createEvent("reset sizes");

export const $sizeMode = createStore<string>("default").on(
  onChangeSizeMode,
  (_, mode) => mode
);
export const $sizes = createStore({ containerWidth: 768 }).on(
  setSize,
  (_, size) => ({ containerWidth: size })
);

sample($sizeMode, $sizes, (mode, size) => {
  if (mode === "default") setSize(768);
  return size;
});
