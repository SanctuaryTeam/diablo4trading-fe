/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_API_ENDPOINT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}