// tsconfig-link-shared.js
const fs = require('fs');

const tsconfigFileBase = './tsconfig.base.json';
const tsconfigFileMerged = './tsconfig.merged.json';
const packageName = '@sanctuaryteam/shared';

// Read the tsconfig files
const tsconfigBase = JSON.parse(fs.readFileSync(tsconfigFileBase, 'utf8'));

// Check environment variable or any other logic
if (process.env.SHARED_LINK === 'true') {
    tsconfigBase.compilerOptions.paths[packageName] = [`${process.env.SHARED_PATH}/src`];
}

// Write the modified tsconfig back to the file
fs.writeFileSync(tsconfigFileMerged, JSON.stringify(tsconfigBase, null, 2));
