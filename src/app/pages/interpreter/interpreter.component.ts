import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RuleGroup } from './rule';
import { Query } from './query';
import { Dict } from './dict';

@Component({
    selector: 'octopus-interpreter',
    templateUrl: './interpreter.component.html',
    styleUrls: ['./interpreter.component.scss']
})
export class InterpreterComponent implements OnInit {

    rules: RuleGroup[];
    queryResult: Query;
    dict: Dict;
    dictkeys: string[];

    constructor(private http: HttpClient) { }

    /**
     * will init the rules
     */
    ngOnInit() {
        this.http.get('/api/v1/rules').subscribe((data: RuleGroup[]) => {
            this.rules = data.map(ruleGroup => {
                return {
                    Rules: ruleGroup.Rules.map(rule => {
                        return Object.assign({}, rule, { Enabled: !rule.Disabled })
                    }),
                    Tag: ruleGroup.Tag,
                }
            });
        });

        this.http.get('/api/v1/dict').subscribe((data: Dict) => {
            this.dict = data;
            this.dictkeys = Object.keys(data.Map);
        });
    }

    query(searchQuery: string) {
        this.http.post('/api/v1/interpret', { query: { nl: searchQuery } }).subscribe((data: Query) => {
            if (!data.Select) {
                this.queryResult = { Select: [] };
                return;
            }
            this.queryResult = Object.assign({}, data, {
                Select: data.Select.map(field => Object.assign({}, field, { DictWord: String.fromCharCode(...field.Word) }))
            });
        });
    }

    setRuleDisableState(pos: number, grpPos: number, state: boolean) {
        this.http.post('/api/v1/rules/state', { params: { position: pos, group_position: grpPos, disabled_state: state } }).subscribe((data: Query) => {
        });
    }
}