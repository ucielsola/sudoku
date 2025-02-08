export const cloneDeep = <T>(obj: T): T => {
    if (Array.isArray(obj)) {
        return obj.map(cloneDeep) as T;
    } else if (typeof obj === 'object' && obj !== null) {
        return Object.assign({}, ...Object.entries(obj).map(([key, value]) => ({ [key]: cloneDeep(value) })));
    } else {
        return obj;
    }
};