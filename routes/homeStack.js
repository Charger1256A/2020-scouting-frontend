import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import matchlist from '../screens/matchlist'
import auto from '../screens/auto'

const screens = {
    MatchListScreen: {
        screen: matchlist
    },
    AutoScreen: {
        screen: auto
    }

}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack);