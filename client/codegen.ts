import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  documents: ['src/queries/**/*.{graphql,gql}'],
  generates: {
    'src/gql/types.ts': {
      plugins: [
        { add: { content: '/* eslint-disable */' } },
        {
          add: { content: "/* WARNING: THIS FILE IS GENERATED, DON'T EDIT */" },
        },
        'typescript',
      ],
      config: {
        avoidOptionals: true,
        defaultScalarType: 'unknown',
      },
    },
    'src/gql/operations.ts': {
      plugins: [
        { add: { content: '/* eslint-disable */' } },
        {
          add: { content: "/* WARNING: THIS FILE IS GENERATED, DON'T EDIT */" },
        },
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        avoidOptionals: true,
        defaultScalarType: 'unknown',
        baseTypesPath: './types.ts',
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
