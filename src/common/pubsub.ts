
/**
 * usage: 
 *      let pubsub = new PubSub()
 *      pubsub.reg('/some/event', (arg1, arg2)=>{//...})
 *      pubsub.pub('/som/event', arg, arg) 
 */
type Callback = (...args: any[]) => void
export class PubSub {
    private hub: { [key: string]: any } = {}

    reg(name: string, callback: Callback) { //todo:
        if (this.hub[name] == null) {
            this.hub[name] = [];
        }
        var idx = this.hub[name].indexOf(callback);
        if (idx !== -1) {
            return;
        }
        this.hub[name].push(callback);
        return () => {
            this.unreg(name, callback)
        }
    }

    unreg(name: string, callback: Callback) {
        if (this.hub[name] == null) return;

        var idx = this.hub[name].indexOf(callback);
        if (idx === -1) {
            return;
        }
        this.hub[name].splice(idx, 1);
    }

    pub(name: string) {
        var args = Array.prototype.slice.call(arguments).slice(1);
        if (this.hub[name] != null && this.hub[name].length !== 0) {
            for (var i = 0; i < this.hub[name].length; i++) {
                var cb = this.hub[name][i];
                cb.apply({}, args);
            }
        }
    }
}