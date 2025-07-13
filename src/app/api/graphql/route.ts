import { createSchema, createYoga } from 'graphql-yoga';
import { promises as fs } from 'fs';

const readDir = async () => {
  const location = process.env.STATIC_FILES_LOCATION!;

  const files = await fs.readdir(location.trim());

  const htmlContent = /*html*/ `
        <ul>
          ${files
            .map((file) => `<li><a href="https://geef.cc/static/${file}" target="_blank">${file}</a></li>`)
            .join('')}
        </ul>
      `;
  return htmlContent;
};

interface NextContext {
  params: Promise<Record<string, string>>;
}

const { handleRequest } = createYoga<NextContext>({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        files: String!
      }
    `,
    resolvers: {
      Query: {
        files: () => readDir()
      }
    }
  }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response }
});

export const dynamic = 'force-dynamic'; // Disable static rendering
export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS };
