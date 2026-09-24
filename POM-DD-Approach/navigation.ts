import { Page } from '@playwright/test';

export async function gotoWithRetry(
  page: Page,
  url: string,
  attempts = 3
): Promise<void> {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 45_000,
      });
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isRetryableNetworkIssue = [
        'ERR_NAME_NOT_RESOLVED',
        'ERR_CONNECTION_REFUSED',
        'ERR_CONNECTION_TIMED_OUT',
        'net::ERR_NAME_NOT_RESOLVED',
      ].some((code) => message.includes(code));

      if (isRetryableNetworkIssue && attempt < attempts) {
        await page.waitForTimeout(2_000);
        continue;
      }

      throw error;
    }
  }
}
