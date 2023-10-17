
export function convertHtmlTag(input: string): string {
  return input
    .replace(/<br>/g, '\n');
}

