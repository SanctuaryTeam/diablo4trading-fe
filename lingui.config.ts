import type { LinguiConfig } from "@lingui/conf";
import { formatter } from "@lingui/format-json";

const config: LinguiConfig = {
    locales: [
        "de-DE",
        "en-US",
        "es-ES",
        "fr-FR",
        "it-IT",
        "ja-JP",
        "ko-KR",
        "pl-PL",
        "pt-PT",
        "ru-RU",
        "tr-TR",
        "zh-CN",
        "zh-TW",
    ],
    sourceLocale: "en-US",
    catalogs: [
        {
            path: "src/modules/common/i18n/{locale}",
            include: [
                "src"
            ],
            exclude: [
                "**/types/**",
                "**/node_modules/**",
            ]
        }
    ],
    format: formatter({
        style: 'minimal'
    })
};

export default config;