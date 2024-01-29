/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_MOCK_SERVER: string;
  readonly MAIN_MOCK_API_URL: string;
  readonly MAIN_GITLAB_API_URL: string;
  readonly MAIN_GITLAB_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
