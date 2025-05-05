export type NodeTypeHierarchy = {
  name: string;
  level: number;
};

export const NODE_TYPE_LIST: NodeTypeHierarchy[] = [
  { name: 'Business Service', level: 1 },
  { name: 'IT System', level: 2 },
  { name: 'Web server', level: 2 },
  { name: 'Infrastructure', level: 3 },
  { name: 'Database server', level: 4 },
  { name: 'Host', level: 4 },
];
