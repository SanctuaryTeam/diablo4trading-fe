module.exports = {
    rootDir: './',
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/test/unit/**/*.test.ts'],
    'collectCoverage': false,
    'coverageDirectory': '<rootDir>/coverage/unit/',
    'collectCoverageFrom': [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/index.ts',
        '!src/config.ts',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
    'coverageReporters': ['text', 'lcov', 'clover', 'html'],
};
