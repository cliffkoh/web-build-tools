import { task, watch, serial, parallel, IExecutable, setConfig } from '@microsoft/gulp-core-build';
import { typescript, tslint, apiExtractor } from '@microsoft/gulp-core-build-typescript';
import { instrument, mocha } from '@microsoft/gulp-core-build-mocha';

export * from '@microsoft/gulp-core-build';
export * from '@microsoft/gulp-core-build-typescript';
export * from '@microsoft/gulp-core-build-mocha';

// Define default task groups.

const PRODUCTION = process.argv.indexOf('--production') !== -1 || process.argv.indexOf('--ship') !== -1;
setConfig({
  production: PRODUCTION,
  shouldWarningsFailBuild: PRODUCTION
});

tslint.mergeConfig({
  displayAsWarning: true
});

const buildSubtask: IExecutable = serial(parallel(tslint, typescript), apiExtractor);
export const buildTasks: IExecutable = task('build', buildSubtask);
export const testTasks: IExecutable = task('test', serial(buildSubtask, mocha));
export const defaultTasks: IExecutable = task('default', serial(buildSubtask, instrument, mocha));

task('watch', watch('src/**.ts', testTasks));
