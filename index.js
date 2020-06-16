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
    3: {
        blue: require('./assets/field_drawings/blue-game-1.png'),
        red: require('./assets/field_drawings/red-game-1.png'),
    },
    4: {
        blue: require('./assets/field_drawings/blue-game-2.png'),
        red: require('./assets/field_drawings/red-game-2.png'),
    }

};

export default fieldImages;
AppRegistry.registerComponent(appName, () => App);