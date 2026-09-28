import fs from 'node:fs';
import path from 'node:path';
import type { Page } from '@playwright/test';
import { Login } from './Login';

export type Credentials = {
  username: string;
  password: string;
};

export function getCredentials(): Credentials {
  const envCredentials = process.env.LOGIN_CREDENTIALS?.trim();

  if (envCredentials) {
    try {
      const parsed = JSON.parse(envCredentials) as Partial<Credentials>;
      if (parsed.username && parsed.password) {
        return {
          username: parsed.username,
          password: parsed.password,
        };
      }
      throw new Error('LOGIN_CREDENTIALS must contain username and password');
    } catch (error) {
      if (error instanceof Error && error.message === 'LOGIN_CREDENTIALS must contain username and password') {
        throw error;
      }
      throw new Error('LOGIN_CREDENTIALS must contain valid JSON');
    }
  }

  const fallbackPath = path.resolve(process.cwd(), 'ExternalFile', 'login.json');
  if (fs.existsSync(fallbackPath)) {
    const fileContents = fs.readFileSync(fallbackPath, 'utf8');
    const parsed = JSON.parse(fileContents) as Partial<Credentials>;
    if (parsed.username && parsed.password) {
      return {
        username: parsed.username,
        password: parsed.password,
      };
    }
  }

  throw new Error('LOGIN_CREDENTIALS is not configured. Set LOGIN_CREDENTIALS or provide ExternalFile/login.json');
}

export async function loginAsDefaultUser(page: Page): Promise<void> {
  const credentials = getCredentials();
  const login = new Login(page);
  await login.goTo();
  await login.validLogin(credentials.username, credentials.password);
}
