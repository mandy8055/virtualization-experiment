import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // Points to local schema file — no running server needed for codegen
  schema: './schema.graphql',
  // Where our hand-written query files live
  documents: ['src/queries/**/*.{graphql,gql}'],
  generates: {
    // Single output file — simpler than near-operation-file for sandbox
    'src/gql/': {
      preset: 'client',
      plugins: [
        { add: { content: '/* eslint-disable */' } },
        {
          add: { content: "/* WARNING: THIS FILE IS GENERATED, DON'T EDIT */" },
        },
      ],
      config: {
        // Stricter TypeScript — same philosophy as your production config
        avoidOptionals: true,
        defaultScalarType: 'unknown',
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
