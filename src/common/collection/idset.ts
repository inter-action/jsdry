/**
 * unlike js Set, you can personalize item's equality criteria
 */
type IdFunc<T> = (t: T) => any
export class IdSet<T> {
    set = new Map()
    idFunc: IdFunc<T>

    constructor(idFunc: IdFunc<T>) {
        if (!idFunc) throw new Error('id func is required')
        this.idFunc = idFunc
    }

    get(e: T) {
        return this.set.get(this.idFunc(e))
    }

    add(e: T) {
        this.set.set(this.idFunc(e), e)
    }

    delete(e: T) {
        this.set.delete(this.idFunc(e))
    }

    *[Symbol.iterator]() {
        for (let [_k, value] of this.set) {
            yield value
        }
    }

    toList() {
        return [...this]
    }

    get size() {
        return this.toList().length
    }
}
