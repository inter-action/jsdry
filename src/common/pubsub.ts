/**
 * usage:
 *      let pubsub = new PubSub()
 *      pubsub.reg('/some/event', (arg1, arg2)=>{//...})
 *      pubsub.pub('/som/event', arg, arg)
 */
export type Callback = (...args: any[]) => void
export class PubSub {
    private hub: { [key: string]: any } = {}

    public reg(name: string, callback: Callback) {
        // todo:
        if (this.hub[name] == null) {
            this.hub[name] = []
        }
        const idx = this.hub[name].indexOf(callback)
        if (idx !== -1) {
            return
        }
        this.hub[name].push(callback)
        return () => {
            this.unreg(name, callback)
        }
    }

    public unreg(name: string, callback: Callback) {
        if (this.hub[name] == null) return

        const idx = this.hub[name].indexOf(callback)
        if (idx === -1) {
            return
        }
        this.hub[name].splice(idx, 1)
    }

    public pub(name: string) {
        const args = Array.prototype.slice.call(arguments).slice(1)
        if (this.hub[name] != null && this.hub[name].length !== 0) {
            for (const cb of this.hub[name]) {
                cb.apply({}, args)
            }
        }
    }
}
