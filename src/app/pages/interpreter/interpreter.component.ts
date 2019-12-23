import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as moment from "moment";

import { RuleGroup } from "./rule";
import { Query } from "./query";
import { Dict } from "./dict";

@Component({
  selector: "octopus-interpreter",
  templateUrl: "./interpreter.component.html",
  styleUrls: ["./interpreter.component.scss"]
})
export class InterpreterComponent implements OnInit {
  rules: RuleGroup[];
  queryResult: Query;
  dict: Dict;
  dictkeys: string[];

  constructor(private http: HttpClient) {}

  private rgMap = ruleGroup => {
    return {
      rules: ruleGroup.rules.map(rule => {
        return Object.assign({}, rule, { Enabled: !rule.disabled });
      }),
      tag: ruleGroup.tag
    };
  };

  /**
   * will init the rules
   */
  ngOnInit() {
    this.http.get("/api/v1/rules").subscribe((data: RuleGroup[]) => {
      this.rules = data.map(this.rgMap);
    });

    this.http.get("/api/v1/dict").subscribe((data: Dict) => {
      this.dict = data;
      this.dictkeys = Object.keys(data.Map);
    });
  }

  query(searchQuery: string) {
    this.http
      .post("/api/v1/interpret", { nl: searchQuery })
      .subscribe((data: Query) => {
        this.queryResult = data;
        // transform the date filters
        if (this.queryResult.filters) {
          this.queryResult.filters.forEach(fil => {
            if (!fil["time"]) {
              return;
            }
            if (fil["time"].value.value) {
              fil["time"].value.value = moment(fil["time"].value.value);
              return;
            }
            if (fil["time"].value.from) {
              fil["time"].value.from.value = moment(
                fil["time"].value.from.value
              );
              return;
            }
            if (fil["time"].value.to) {
              fil["time"].value.to.value = moment(fil["time"].value.to.value);
              return;
            }
          });
        }
      });

    this.http.get("/api/v1/rules").subscribe((data: RuleGroup[]) => {
      this.rules = data.map(this.rgMap);
    });
  }

  setRuleDisableState(pos: number, grpPos: number, state: boolean) {
    this.http
      .post("/api/v1/rules/state", {
        position: pos,
        group_position: grpPos,
        disabled_state: state
      })
      .subscribe((data: Query) => {});
  }
}
