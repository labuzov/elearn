
class DataBaseService {
    public parseObjectsFirstLetters(objects: any[]) {
        const parsedObjects = [];

        for (const obj of objects) {
            const parsedObject: any = {};

            for (const key in obj) {
                if (!obj.hasOwnProperty(key)) continue;

                const newKey = key[0].toLowerCase() + key.slice(1);
                if (parsedObject.hasOwnProperty(newKey)) continue;

                parsedObject[newKey] = obj[key];
            }

            parsedObjects.push(parsedObject);
        }

        return parsedObjects;
    }

    private _getQueryColumns(columns: string[]) {
        // ['col1', 'col2', ...] => '"col1", "col2", ...'
        return columns.map(col => `"${col}"`).join(', ');
    }

    private _getQueryValueSymbols(values: unknown[]) {
        // [val1, val2, ...] => '$1, $2, ...'
        return values.map((_, index) => '$' + (index + 1)).join(', ');
    }
}

export const dataBaseService = new DataBaseService();
