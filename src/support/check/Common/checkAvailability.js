// checkAvailability.js
import waitForAppReady from '../../lib/waitForAppReady';

/**
 * Backwards-compatible wrapper around the new unified wait.
 * Step: "I wait for the page to be properly rendered"
 */
export default async () => {
    await waitForAppReady({ context: 'checkAvailability' });
};
