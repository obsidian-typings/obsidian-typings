export interface LinkMatchGroups {
  display?: string;
  target: string;
}

export interface MemberInfo {
  description: string;
  examples: string[];
  inheritedFrom: string;
  isOfficial: boolean;
  isStatic: boolean;
  name: string;
  overloadKey: string;
  parameters: ParameterInfo[];
  remarks: string;
  returnDescription: string;
  returnType: string;
  signature: string;
  since: string;
  type: string;
}

export interface PageContent {
  content: string;
  filePath: string;
}

export interface ParameterInfo {
  description: string;
  name: string;
  type: string;
}

export interface ReturnTypeProvider {
  getReturnType(): TextProvider;
  getReturnTypeNode?(): TextProvider | undefined;
}

export interface SidebarEntry {
  collapsed: boolean;
  items: (SidebarEntry | SidebarLink)[];
  label: string;
}

export interface SidebarLink {
  label: string;
  link: string;
}

/** Recursive tree node for building the sidebar */
export interface SidebarTreeNode {
  children: Map<string, SidebarTreeNode>;
  types: TypeInfo[];
}

export interface TextProvider {
  getText(): string;
}

export interface TypeInfo {
  baseTypes: string[];
  description: string;
  examples: string[];
  /** For classes: types in the `implements` clause */
  implementsTypes: string[];
  isOfficial: boolean;
  kind: 'class' | 'function' | 'interface' | 'variable';
  methods: MemberInfo[];
  name: string;
  namespace: string;
  properties: MemberInfo[];
  remarks: string;
  typeParameters: string[];
  /** For variables: the declaration keyword (let/const/var) */
  variableKeyword?: string;
  /** For variables: the type annotation */
  variableType?: string;
}

export interface WebApiEntry {
  url: string;
}
