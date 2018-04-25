/**
 * unlike js Set, you can personalize item's equality criteria
 */
export type IdFunc<T> = (t: T) => any
export class IdSet<T> {
    private set = new Map()
    private idFunc: IdFunc<T>

    constructor(idFunc: IdFunc<T>) {
        if (!idFunc) throw new Error('id func is required')
        this.idFunc = idFunc
    }

    public get(e: T) {
        return this.set.get(this.idFunc(e))
    }

    public add(e: T) {
        this.set.set(this.idFunc(e), e)
    }

    public delete(e: T) {
        this.set.delete(this.idFunc(e))
    }

    public *[Symbol.iterator]() {
        for (const [_k, value] of this.set) {
            yield value
        }
    }

    public toList() {
        return [...this]
    }

    public get size() {
        return this.toList().length
    }
}
