// // next.config.ts
// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   output: 'export',
//   images: {
//     domains: ['tivaco.borodadigital.com'],
//     unoptimized: true,
//   },
// };

// export default nextConfig;

// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',

  trailingSlash: true, // 👈 заставляет создавать /папка/index.html

  images: {
    unoptimized: true,
    domains: ['tivaco.borodadigital.com'],
  },
};

export default nextConfig;
