/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ]
  },
  webpack: (config) => {
    // Add a rule to ignore HTML files
    config.module.rules.push({
      test: /\.html$/,
      use: {
        loader: 'ignore-loader'
      }
    });

    return config;
  },
}

module.exports = nextConfig;
