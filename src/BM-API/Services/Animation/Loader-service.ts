import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LoaderService {
    private loading: Boolean = false;
    constructor () {}

    setLoading(loading : Boolean) : void {
        this.loading = loading;
    }

    getLoading() : Boolean {
        return this.loading;
    }
}