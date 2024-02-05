export class BaseSearchModel<T> {
    public totalRecords!: any;
    public currentPage!: any;
    public recordOfPage!: any;
    public sortAsc!: boolean;
    public sortBy!: string;
    public result!: any[];

    constructor(data?: BaseSearchModel<T>) {
        const baseSearch = data == null ? this : data;
        this.result = baseSearch.result;
    }
}
