import { serial, IExecutable } from '@microsoft/gulp-core-build';
import { MochaTask } from './MochaTask';
import { InstrumentTask } from './InstrumentTask';

export const instrument: InstrumentTask = new InstrumentTask();
export const mocha: MochaTask = new MochaTask();

export default serial(instrument, mocha) as IExecutable; // tslint:disable-line:export-name no-any
