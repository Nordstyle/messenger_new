type Nullable<T> = T | null;
type Modify<T, R> = Omit<T, keyof R> & R;
