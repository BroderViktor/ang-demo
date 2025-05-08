/**
 * These are helper types for a class
 *
 * if a class, TESTCLASS has a function TEST
 * you can use TodoReturnTypes<"TEST"> to get the return type of TEST
 *
 *  */

// type FunctionKeys<T> = {
//   [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? K : never;
// }[keyof T];

// export type TodoReturnTypes<T extends FunctionKeys<TESTCLASS>> = Awaited<
//   ReturnType<TESTCLASS[T]>
// >;
