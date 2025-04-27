import { createSchema, createYoga } from 'graphql-yoga';
import { promises as fs } from 'fs';
import path from 'path';

const readDir = async () => {
  const filePath = path.join(process.cwd(), 'src', 'app', 'api', 'graphql', 'location.txt');

  const location = await fs.readFile(filePath, 'utf8');

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
