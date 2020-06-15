/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const fieldImages = {
    1: {
        blue: require('./assets/field_drawings/blue-field-1.png'),
        red: require('./assets/field_drawings/red-field-1.png'),

    },
    2: {
        blue: require('./assets/field_drawings/blue-field-2.png'),
        red: require('./assets/field_drawings/red-field-2.png'),

    },
    blue: {
        1: require('./assets/field_drawings/full-field-2.png'),
        2: require('./assets/field_drawings/full-field-1.png'),
    },
    red: {
        1: require('./assets/field_drawings/full-field-1.png'),
        2: require('./assets/field_drawings/full-field-2.png'),
    }

};

export default fieldImages;
AppRegistry.registerComponent(appName, () => App);