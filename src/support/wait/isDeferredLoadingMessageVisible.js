/**
 * Detects whether the current view is under "deferred loading" mode.
 * This is shown as:
 *
 *   "We’re loading your content. You can safely navigate away—we’ll notify you when it's ready."
 *
 * If visible, final results will NOT appear until the Task Manager job finishes.
 */
export default async function isDeferredLoadingMessageVisible() {

    const selector = "//*[contains(text(), \"We’re loading your content\")]";

    try {
        const msgs = await $$(selector);
        if (!msgs.length) return false;

        for (const msg of msgs) {
            try {
                if (await msg.isDisplayed()) return true;
            } catch {}
        }

        return false;
    } catch {
        return false;
    }
}
