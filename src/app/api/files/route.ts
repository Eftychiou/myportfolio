import { promises as fs } from 'fs'; // Use promises version of fs for async operations
import path from 'path'; // To handle file paths
import { NextResponse } from 'next/server';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'app', 'api', 'files', 'location.txt');

  const location = await fs.readFile(filePath, 'utf8');

  const files = await fs.readdir(location.trim());

  const htmlContent = /*html*/ `     
    <ul>
      ${files.map((file) => `<li><a href="https://geef.cc/static/${file}" target="_blank">${file}</a></li>`).join('')}
    </ul>
  `;
  return new NextResponse(htmlContent, {
    headers: { 'Content-Type': 'text/html' }
  });
}
