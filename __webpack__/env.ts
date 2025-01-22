/* eslint-disable @typescript-eslint/no-unused-vars */
import dotenv from "dotenv"
import { execSync } from 'child_process';

import path from 'path';

const { NODE_ENV, MODE } = process.env;

if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  );
}

export const mode = MODE ?? NODE_ENV;

const dotenvPath = path.resolve(__dirname, `.env.${mode}`);

dotenv.config({ path: dotenvPath });

process.env.BABEL_ENV = mode;

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^(react_app_|firebase_)/i;

export function getClientEnvironment(publicUrl?: string) {
  const branchName = execSync('git rev-parse --abbrev-ref HEAD');

  const raw = Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        // @ts-ignore
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: NODE_ENV || 'development',
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: publicUrl,
        REACT_APP_VERSION: process.env.REACT_APP_VERSION || '' + branchName,
      },
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      // @ts-ignore

      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return {
    raw,
    stringified,
  };
}
