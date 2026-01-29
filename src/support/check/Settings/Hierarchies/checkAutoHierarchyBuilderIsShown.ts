export default async() => {
    const url = await browser.getUrl();
    expect(url).toContain('reporting/Settings/Hierarchies/AutoHierarchyBuilder/Create')
} 