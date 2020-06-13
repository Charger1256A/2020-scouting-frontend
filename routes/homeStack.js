import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import matchlist from '../screens/matchlist'
import auto from '../screens/auto'

const screens = {
    MatchListScreen: {
        screen: matchlist,
        navigationOptions: {
            title: 'Matches',

            headerStyle: {
                backgroundColor: '#3486eb'
            },
        }
    },
    AutoScreen: {
        screen: auto,

        navigationOptions: {
            title: 'Auto',

            headerStyle: {
                backgroundColor: '#3486eb'
            },
        }
    }

}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack);