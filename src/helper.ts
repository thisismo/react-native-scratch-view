export function pathsToSVG(path: Array<Array<[x: number, y: number]>>) {
    return path.map(currentPath => {
        return currentPath.map((pos, index) => {
            return index == 0 ? `M ${pos[0]}, ${pos[1]}` : `L ${pos[0]}, ${pos[1]}`;
        }).join("");
    }).join("");
}

export function pathToSVG(path: Array<[x: number, y: number]>) {
    return path.map((pos, index) => {
        return index == 0 ? `M ${pos[0]}, ${pos[1]}` : `L ${pos[0]}, ${pos[1]}`;
    }).join("");
}

export function posToSVG(length: number, pos: [x: number, y: number]) {
    return length == 0 ? `M ${pos[0]}, ${pos[1]}` : `L ${pos[0]}, ${pos[1]}`;
}
