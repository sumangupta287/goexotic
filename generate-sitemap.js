const axios = require('axios');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.goexotic.co';
const CMS_API_URL = 'https://goexotic.co/admin/api/getallcms/'; // CMS pages
const PRODUCTS_API_URL = 'https://goexotic.co/admin/api/getallcarlist/'; // Product list API

async function generateSitemap() {
    try {
        // Fetch CMS pages
        const cmsResponse = await axios.get(CMS_API_URL);
        const cmsPages = cmsResponse.data;

        // Fetch products
        const productsResponse = await axios.get(PRODUCTS_API_URL);
        const products = productsResponse.data;
// console.log('📦 Products Response:', JSON.stringify(products, null, 2));

        if (!Array.isArray(cmsPages) || !Array.isArray(products)) {
            throw new Error('API did not return expected arrays.');
        }

        // Static URLs
        const staticUrls = [
            `${BASE_URL}/pre-owned-used-luxury-car`,
        ];

        // Generate CMS URLs
        const cmsUrls = cmsPages.map((page) => `${BASE_URL}/${page.slug}`);
        const slugify = (str) =>
        str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

        const productUrls = products.map((product) => {
        // const brandNameRaw = Array.isArray(product.brand) && product.brand.length > 0 ? product.brand[0].brnad_name : 'unknown-brand';
        const brandNameRaw = product.brand?.brand_name || 'unknown-brand'; // Access brand_name
        const brandName = slugify(brandNameRaw);
        return `${BASE_URL}/pre-owned-used-luxury-car/${brandName}/${product.slug}`;
        });

        // Generate Product URLs
        // const productUrls = products.map((product) => `${BASE_URL}/pre-owned-used-luxury-car/${product.brand.brnad_name}/${product.slug}`);

        // Merge all URLs
        const allUrls = [...staticUrls, ...cmsUrls, ...productUrls];

        // Build Sitemap XML
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
    .map((url) => {
        return `<url>
  <loc>${url}</loc>
  <changefreq>daily</changefreq>
  <priority>0.8</priority>
</url>`;
    })
    .join('\n')}
</urlset>`;

        // Save sitemap.xml
        fs.writeFileSync(path.join(__dirname, 'src', 'sitemap.xml'), sitemap);
        console.log('✅ Sitemap generated successfully!');
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
    }
}

generateSitemap();
