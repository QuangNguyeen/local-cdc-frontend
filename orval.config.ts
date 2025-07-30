import { defineConfig } from 'orval';

export default defineConfig({
    api: {
        input: {
            target: 'http://localhost:8080/api-json',
        },
        output: {
            client: 'react-query',
            target: 'src/lib/api.ts',
            schemas: 'src/lib/schemas',
            mock: false,
            override: {
                mutator: {
                    path: './src/lib/axiosInstance.ts',
                    name: 'axiosInstance',
                },
                query: {
                    useQuery: true,
                    useMutation: true,
                },
            },
        },
    },
});
