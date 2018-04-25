/**
 * like hash map, but using array to store multiple values, instead of just one
 */
export class Container {
    private container = new Map()
    constructor() {
        this.container = new Map()
    }

    public set(key: string, value: any) {
        if (!this.container.has(key)) {
            this.container.set(key, [])
        }
        this.container.get(key).push(value)
    }

    public get(key: string) {
        if (this.container.has(key)) {
            return this.container.get(key)
        }
        return []
    }

    public getFirstMatch(key: any) {
        for (const value of this.get(key)) {
            return value
        }
        return null
    }

    public *[Symbol.iterator]() {
        for (const [key, value] of this.container) {
            yield [key, value]
        }
    }

    public *uniqueValueIterator() {
        for (const [_key, value] of this.container) {
            yield value[0]
        }
    }

    public *allValueIterator() {
        for (const [_key, value] of this.container) {
            yield* value
        }
    }

    public toString() {
        const rs = []
        for (const entry of this) {
            rs.push(JSON.stringify(entry))
        }
        return rs.join('\n')
    }
}
