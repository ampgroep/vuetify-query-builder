export default class Child {
    query;
    type;
    originalIndex;
    constructor(query, type = 'query-builder-group', index = 1) {
        this.query = query;
        this.type = type;
        this.originalIndex = index;
    }
}
