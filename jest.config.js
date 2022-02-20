config = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*[^/]\\.(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testPathIgnorePatterns: ['/lib/', '/node_modules/'],
    coveragePathIgnorePatterns: [
        '/lib/',
        '/node_modules/',
    ],
    collectCoverage: true,
	collectCoverageFrom: ['src/**/*.ts'],
    testURL: "http://localhost/"
};

const ignores = [
    'src/Bootstrap.ts',
    'src/index.ts',
    'src/db/migration',
    'src/db/seed',
    'src/bootstrap',
    'src/config',
    'src/config/db',
    'src/repository',
    'src/routes/api',
    'src/service/router/ExpressRoutesManager',
]

config.testPathIgnorePatterns.push(
    ...ignores
);
config.coveragePathIgnorePatterns.push(
    ...ignores
);

module.exports = config;