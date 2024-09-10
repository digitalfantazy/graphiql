declare module 'graphql-prettier' {
  declare function prettify(source: string, noDuplicates = true): string;
  export default prettify;
}
