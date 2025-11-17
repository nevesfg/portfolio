/** @type {import('next').NextConfig} */
const nextConfig = {
    // Modo standalone para Docker - gera bundle otimizado
    output: "standalone",

    allowedDevOrigins: ["192.168.0.111"],

    images: {
        domains: ["via.placeholder.com"],
    },

    // Configurações para produção
    reactStrictMode: true,

    // Compressão e otimização
    compress: true,

    // Headers de segurança adicionais
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
