import { test } from '@playwright/test';
import { Login } from '../POM-DD-Approach/Login';
import { getCredentials } from '../POM-DD-Approach/authHelper';

test('Login and save session', async ({ browser }) => {
  const credentials = getCredentials();

  const context = await browser.newContext();
  const page = await context.newPage();
  const login = new Login(page);

  await login.goTo();
  await login.validLogin(credentials.username, credentials.password);
  await context.storageState({ path: 'auth.json' });
  await context.close();
});
