type NODE_ENV = "dev" | "production";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: NODE_ENV;
    }
  }
}

export {};