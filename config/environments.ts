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

export const currentEnvironment: Environment =
  environments[process.env.TEST_ENV ?? 'production'];
