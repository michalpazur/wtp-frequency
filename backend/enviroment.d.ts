type NODE_ENV = "dev" | "production";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: NODE_ENV;
      ALLOWED_ORIGIN: string;
    }
  }
}

export {};