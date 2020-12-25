import React, { useCallback, useState } from 'react';
import { App } from '../../services/App';
import { Toggle } from '@ui-kitten/components';

export const ChangeTheme = () => {
    const [checked, setChecked] = useState<boolean>(App.theme === 'light');

    const change = useCallback(() => {
        App.changeTheme();
        setChecked(!checked);
    }, [checked]);

    return (
        <Toggle checked={checked} onChange={change}/>
    );
};
