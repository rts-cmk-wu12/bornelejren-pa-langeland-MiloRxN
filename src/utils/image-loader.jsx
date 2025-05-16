/**
 * Load all images from a directory using Vite's import.meta.glob
 * @returns {Promise<string[]>} Array of image URLs
 */
export const loadImages = async (directory = '/src/assets/images/') => {
    const imageModules = import.meta.glob('/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,gif,svg}');

    const imagePromises = Object.entries(imageModules).map(async ([path, importModule]) => {
        const module = await importModule();
        return {
            path: path,
            url: module.default
        };
    });

    const images = await Promise.all(imagePromises);

    // Filter by directory if specified
    return images
        .filter(image => image.path.startsWith(directory))
        .map(image => image.url);
};