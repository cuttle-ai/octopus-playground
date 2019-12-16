export interface Rule {
    Name: string;
    Description: string;
    Disabled: boolean;
}

//RuleGroup will contain a list of rules
export interface RuleGroup {
    Rules: Rule[];
    Tag: string;
}