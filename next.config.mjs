/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
    
        return [
          {
            source: "/",
            destination: "/home",
            permanent: true,
          },
           {
            source: "/home/checkout",
            destination: "/home/checkout/complete-order",
            permanent: true,
          },
        ];
      },
      crossOrigin: 'anonymous',
      images: {
        domains: ['www.alamy.com','lh3.googleusercontent.com','cdn.pixabay.com', 'c7.alamy.com','images.unsplash.com'],
    },
      reactStrictMode: false,
};

export default nextConfig;
