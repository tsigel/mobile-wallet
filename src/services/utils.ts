export const toArray = <T>(some: T): Array<T> => (Array.isArray(some) ? some : [some]);
