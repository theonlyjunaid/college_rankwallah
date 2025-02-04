import type { MetadataRoute } from 'next'

const baseUrl = "https://rankwallah.in"

// Type for valid change frequencies
type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        // Fetch all result URLs with caching and timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const res = await fetch(`${baseUrl}/api/result/getall`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
            throw new Error(`Failed to fetch results: ${res.status}`);
        }

        const results = await res.json() as string[];

        // Generate sitemap entries for each result
        return results.map((result) => ({
            url: `${baseUrl}/${result.split("/").join("-")}`,
            lastModified: new Date(), // Add last modified date
            changeFrequency: 'daily' as ChangeFrequency,
            priority: 0.8,
        }));

    } catch (error) {
        console.error('Error generating result sitemap:', error);
        // Return empty array on error to prevent site breaking
        return [];
    }
}
