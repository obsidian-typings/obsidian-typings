export interface LinkMatchGroups {
  readonly display?: string;
  readonly target: string;
}

export interface MemberInfo {
  // eslint-disable-next-line typescript-dev-toolkit/readonly-interface-members -- Declaration merging replaces official descriptions with augmented documentation.
  description: string;
  readonly examples: string[];
  readonly inheritedFrom: string;
  readonly isOfficial: boolean;
  readonly isStatic: boolean;
  readonly name: string;
  // eslint-disable-next-line typescript-dev-toolkit/readonly-interface-members -- JSDoc extraction fills the overload key after constructing the member.
  overloadKey: string;
  readonly parameters: ParameterInfo[];
  readonly remarks: string;
  readonly returnDescription: string;
  readonly returnType: string;
  readonly signature: string;
  readonly since: string;
  readonly type: string;
}

export interface PageContent {
  readonly content: string;
  readonly filePath: string;
}

export interface ParameterInfo {
  readonly description: string;
  readonly name: string;
  readonly type: string;
}

export interface ReturnTypeProvider {
  readonly getReturnType: () => TextProvider;
  readonly getReturnTypeNode?: () => TextProvider | undefined;
}

export interface SidebarEntry {
  readonly collapsed: boolean;
  readonly items: (SidebarEntry | SidebarLink)[];
  readonly label: string;
}

export interface SidebarLink {
  readonly label: string;
  readonly link: string;
}

/**
Recursive tree node for building the sidebar
*/
export interface SidebarTreeNode {
  readonly children: Map<string, SidebarTreeNode>;
  readonly types: TypeInfo[];
}

export interface TextProvider {
  readonly getText: () => string;
}

export interface TypeInfo {
  readonly baseTypes: string[];
  // eslint-disable-next-line typescript-dev-toolkit/readonly-interface-members -- Declaration merging replaces the type description with augmented documentation.
  description: string;
  // eslint-disable-next-line typescript-dev-toolkit/readonly-interface-members -- Declaration merging replaces examples with the augmented examples.
  examples: string[];
  /**
  For classes: types in the `implements` clause
  */
  readonly implementsTypes: string[];
  readonly isOfficial: boolean;
  readonly kind: 'class' | 'function' | 'interface' | 'variable';
  readonly methods: MemberInfo[];
  readonly name: string;
  // eslint-disable-next-line typescript-dev-toolkit/readonly-interface-members -- Namespace discovery fills this property after constructing the type.
  namespace: string;
  readonly properties: MemberInfo[];
  // eslint-disable-next-line typescript-dev-toolkit/readonly-interface-members -- Declaration merging replaces remarks with the augmented remarks.
  remarks: string;
  // eslint-disable-next-line typescript-dev-toolkit/readonly-interface-members -- Declaration merging fills missing type parameters from later declarations.
  typeParameters: string[];
  /**
  For variables: the declaration keyword (let/const/var)
  */
  readonly variableKeyword?: string;
  /**
  For variables: the type annotation
  */
  readonly variableType?: string;
}

export interface WebApiEntry {
  readonly url: string;
}
