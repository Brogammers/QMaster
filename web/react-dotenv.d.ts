// react-dotenv.d.ts
// declare module '@env' {
//   export const ENCRYPTION_ALGORITHM: string;
// }
// react-dotenv.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    ENCRYPTION_ALGORITHM: string;
  }
}
