export interface Rule {
    name: string;
    description: string;
    disabled: boolean;
    enabled?: boolean;
}

//RuleGroup will contain a list of rules
export interface RuleGroup {
    rules: Rule[];
    tag: string;
}