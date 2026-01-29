export default async() => {
    // Maybe there is a way to get to the underlying data source
    // In lieu of that, just making sure all clear filter butttons are hidden,
    // with the assumption that kendo knows how to reset filters.
    const selector = 'div[kendo-grid] button span.k-i-filter-clear';

    let clearFilterButtonSpans = await $$(selector);
    
    for (const span of clearFilterButtonSpans)
    {
        const button = await span.parentElement();
        const isDisplayed = await button.isDisplayed();
        expect(isDisplayed).toBeFalsy();
    }
} 