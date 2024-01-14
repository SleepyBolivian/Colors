function getMetaTheme(): string | undefined {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta && meta.getAttribute("content"))
    return meta.getAttribute("content")!;
}

export { getMetaTheme };
