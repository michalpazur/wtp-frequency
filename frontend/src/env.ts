/// <reference types="redux-persist" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_BASE_URL: string;
      REACT_APP_MAPTILER_KEY: string;
    }
  }
}

export {};
