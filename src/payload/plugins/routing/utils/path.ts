export const buildPath = (path?: string) => {
  if (!path) {
    return path;
  }

  return `/${path.replace(/\/\//g, '/').replace(/^\/*|\/*$/, '')}`;
};
