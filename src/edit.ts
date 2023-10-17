
export function editNameWithoutSuffix(input: string): string {
  return input
    .split('#')[0]
    .toLowerCase();
}
