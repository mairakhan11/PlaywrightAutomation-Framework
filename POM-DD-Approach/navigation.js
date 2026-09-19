async function gotoWithRetry(page, url, attempts = 3) {
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
            return;
        } catch (error) {
            const message = error && error.message ? error.message : String(error);
            const isRetryableNetworkIssue = [
                'ERR_NAME_NOT_RESOLVED',
                'ERR_CONNECTION_REFUSED',
                'ERR_CONNECTION_TIMED_OUT',
                'net::ERR_NAME_NOT_RESOLVED'
            ].some(code => message.includes(code));

            if (isRetryableNetworkIssue && attempt < attempts) {
                await page.waitForTimeout(2000);
                continue;
            }

            throw error;
        }
    }
}

module.exports = { gotoWithRetry }; 
