export interface Node {
    UID: string;
    Word: number[];
    PUID: string;
    PN: Node;
    Children?: Node[];
    Resolved: boolean;
    DictWord?: string;
}
export interface Dict {
    Map: Map<string, Node>
}