import { StyleProp, ViewStyle } from 'react-native';

export function parseYupError(e: { inner: Array<{ path: string, errors: Array<string> }>; }) {
    return e.inner.reduce((acc, item) => {
        if (acc[item.path]) {
            return acc;
        }
        acc[item.path] = item.errors[0];

        return acc;
    }, Object.create(null));
}

export function validate(schema: any, values: any): null | Record<string, string> {
    try {
        schema.validateSync(values, { recursive: true, abortEarly: false });
        return null;
    } catch (e) {
        return parseYupError(e);
    }
}
