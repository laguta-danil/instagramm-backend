import { join } from 'path';

import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  outputAs: 'class',
  path: join(process.cwd(), 'src/graphql.schema.ts'),
  typePaths: ['./src/**/*.graphql']
});
