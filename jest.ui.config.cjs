module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',  //TODO when appropriate Add WebDriver.io  pageObjects for typescript
    testMatch: ["<rootDir>/test/ui/**/*.test.ts"]
};
