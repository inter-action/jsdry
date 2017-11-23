/**
 * like hash map, but using array to store multiple values, instead of just one
 */
export class Container {
    private container = new Map()
    constructor() {
        this.container = new Map()
    }

    set(key: string, value: any) {
        if (!this.container.has(key)) {
            this.container.set(key, [])
        }
        this.container.get(key).push(value)
    }

    get(key: string) {
        if (this.container.has(key)) {
            return this.container.get(key)
        }
        return []
    }

    getFirstMatch(key: any) {
        for (let value of this.get(key)) {
            return value
        }
        return null
    }

    *[Symbol.iterator]() {
        for (const [key, value] of this.container) {
            yield [key, value]
        }
    }

    *uniqueValueIterator() {
        for (const [_key, value] of this.container) {
            yield value[0]
        }
    }

    *allValueIterator() {
        for (const [_key, value] of this.container) {
            yield* value
        }
    }

    toString() {
        let rs = []
        for (let entry of this) {
            rs.push(JSON.stringify(entry))
        }
        return rs.join('\n')
    }
}
