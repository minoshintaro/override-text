
export function findInstances(nodes: readonly SceneNode[]): SceneNode[] {
  const result: SceneNode[] = [];
  for (const node of nodes) {
    const { type } = node;
    if (type === 'INSTANCE') {
      result.push(node);
    } else if (type === 'SECTION' || type === 'FRAME' || type === 'GROUP') {
      const subNodes = node.findAllWithCriteria({ types: ['INSTANCE'] });
      result.push(...subNodes);
    }
  }
  return result;
}
