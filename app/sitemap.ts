import type { MetadataRoute } from 'next'

const baseUrl = "https://rankwallah.in"

// Define all site pages with their metadata
const pages = [
    { url: `${baseUrl}/`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/result`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/terms-and-conditions`, changeFrequency: 'weekly', priority: 0.6 },
] as const;

// Additional sitemaps for dynamic content
const additionalSitemaps = [
    { url: `${baseUrl}/result/sitemap.xml` },
] as const;

// Type for valid change frequencies
type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default function sitemap(): MetadataRoute.Sitemap {
    // Static pages
    const staticPages = pages.map((page) => ({
        url: page.url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency as ChangeFrequency,
        priority: page.priority
    }));

    // Additional sitemap references
    const sitemapRefs = additionalSitemaps.map((sitemap) => ({
        url: sitemap.url,
        lastModified: new Date()
    }));

    return [...staticPages, ...sitemapRefs];
}
