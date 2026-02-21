import manifestData from './manifest.generated.json';

export type AssetKey = keyof typeof manifestData;

export const AssetManifest = manifestData as Record<AssetKey, string>;

/**
 * Retrieves the public URL path for a given asset key.
 * If the key is not found, it returns a placeholder path or throws in strict mode.
 */
export function getAssetUrl(key: AssetKey | string): string {
    const url = AssetManifest[key as AssetKey];
    if (!url) {
        console.warn(`Asset map missing key: ${key}`);
        return `/assets/placeholder.png`; // Fallback placeholder
    }
    return url;
}
