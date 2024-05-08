/** @type {import('next').NextConfig} */
const nextConfig = {
    // this causes rerenderings in dev https://stackoverflow.com/questions/71847778/why-my-nextjs-component-is-rendering-twice
    reactStrictMode: false
};

export default nextConfig;
