export const isNotNullFilter = <T>(value: T): value is NonNullable<T> =>
  value != null;