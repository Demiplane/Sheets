export default class Cache<T> {
    private internalCache: { [key: string]: T } = {};

    public getFromCache(key: string, valueCreator: (key: string) => T): T {
        const cachedValue = this.internalCache[key];

        if (cachedValue) {
            return cachedValue;
        }

        var calculated = valueCreator(key);

        this.internalCache[key] = calculated;

        return calculated;
    }

    public clear() {
        this.internalCache = {};
    }
}