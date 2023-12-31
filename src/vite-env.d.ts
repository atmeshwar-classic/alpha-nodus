/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GQL_URL: string;
  readonly VITE_GQL_ACCESS_TOKEN: string;
  readonly VITE_GQL_TENANT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
