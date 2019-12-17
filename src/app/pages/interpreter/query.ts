import { Node } from './dict';

//Query contains the query result
export interface Query {
    select?: Node[];
    group_by?: Node[];
}