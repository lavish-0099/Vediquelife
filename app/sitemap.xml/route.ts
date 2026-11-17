import { NextResponse } from "next/server";
import { getSitemapProducts } from "@/actions/get-sitemap-products";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.vedique.life";

  const products = await getSitemapProducts();

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product.updatedAt || product.createdAt)
      .toISOString()
      .split("T")[0],
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // merge with existing staticRoutes
  const staticRoutes = [
    { url: "/", changeFrequency: "daily" },
    { url: "/vedique-diet", changeFrequency: "yearly" },
    { url: "/products", changeFrequency: "daily" },
    { url: "/how-vedique-diet-works", changeFrequency: "daily" },
    { url: "/contact", changeFrequency: "yearly" },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route.changeFrequency,
    priority: 0.8,
  }));

  const allRoutes = [...staticRoutes, ...productRoutes];

  const urls = allRoutes
    .map(
      ({ url, lastModified, changeFrequency, priority }) => `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastModified}</lastmod>
        <changefreq>${changeFrequency}</changefreq>
        <priority>${priority}</priority>
      </url>
    `
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
