import { test } from '@playwright/test';
import { Login } from '../POM-DD-Approach/Login';

type Credentials = {
  username: string;
  password: string;
};

test('Login and save session', async ({ browser }) => {
  const credentialsJson = process.env.LOGIN_CREDENTIALS;

  if (!credentialsJson) {
    throw new Error('LOGIN_CREDENTIALS is not configured');
  }

  let credentials: Credentials;
  try {
    credentials = JSON.parse(credentialsJson) as Credentials;
  } catch {
    throw new Error('LOGIN_CREDENTIALS must contain valid JSON');
  }

  if (!credentials.username || !credentials.password) {
    throw new Error('LOGIN_CREDENTIALS must contain username and password');
  }

  const context = await browser.newContext();
  const page = await context.newPage();
  const login = new Login(page);

  await login.goTo();
  await login.validLogin(credentials.username, credentials.password);
  await context.storageState({ path: 'auth.json' });
  await context.close();
});
