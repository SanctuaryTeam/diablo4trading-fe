import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    rootDir: './',
    testEnvironment: 'node', // TODO when appropriate Add WebDriver.io  pageObjects for typescript
    testMatch: ['<rootDir>/test/ui/**/*.test.ts'],
};

// eslint-disable-next-line import/no-default-export
export default config;
