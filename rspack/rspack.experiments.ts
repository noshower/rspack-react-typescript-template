/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from '@rspack/cli';

const experimentsConfig: Configuration['experiments'] = {
  rspackFuture: {
    newResolver: true,
    disableApplyEntryLazily: true,
  },
};

export { experimentsConfig };
