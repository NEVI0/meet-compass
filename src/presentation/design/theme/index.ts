import { layout } from './layout';
import { typography } from './typography';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

export const createTheme = (darkMode: boolean = true) => ({
    darkMode,
    layout,
    typography,
    colors: darkMode ? darkTheme : lightTheme,
});
