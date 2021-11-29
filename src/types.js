export const types = {
    software: "Software",
    hardware: "Hardware"
};

export function getTypes() {
    return Object.keys(types).map(key => ({
        type: key,
        label: types[key]
    }));
}

export function getTypeLabel(type) {
    return types[type];
}