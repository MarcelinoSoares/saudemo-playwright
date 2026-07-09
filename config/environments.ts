type Environment = {
  name: string;
  baseURL: string;
};

export const environments: Record<string, Environment> = {
  production: {
    name: 'production',
    baseURL: 'https://www.saucedemo.com',
  },
  staging: {
    name: 'staging',
    baseURL: process.env.STAGING_BASE_URL ?? 'https://www.saucedemo.com',
  },
};

const envName = process.env.TEST_ENV ?? 'production';

if (!environments[envName]) {
  throw new Error(
    `Invalid TEST_ENV: "${envName}". Valid values: ${Object.keys(environments).join(', ')}`,
  );
}

export const currentEnvironment: Environment = environments[envName];
