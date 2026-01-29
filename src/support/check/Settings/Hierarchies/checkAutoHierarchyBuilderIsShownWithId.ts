export default async() => {
    const url = await browser.getUrl();
    expect(url).toContain('reporting/Settings/Hierarchies/AutoHierarchyBuilder/')

    const parts = url.split('/');

    expect(parts.length).toBeGreaterThan(1);
    const id = parseInt(parts[parts.length-1]);

    expect(id).toBeGreaterThan(0);
} 