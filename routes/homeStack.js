import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import matchlist from '../screens/matchlist'
import prematch from '../screens/prematch'
import auto from '../screens/auto'
import scoringmodal from '../screens/ScoringModal'

const screens = {
    MatchListScreen: {
        screen: matchlist,
        navigationOptions: {
            title: 'Matches',
            headerTintColor: 'white',

            headerStyle: {
                backgroundColor: '#3486eb'
            },

            headerTitleStyle: {
                color: 'white'
              }
        }
    },
    PrematchScreen: {
        screen: prematch,
        navigationOptions: {
            title: 'Prematch',
            headerTintColor: 'white',

            headerStyle: {
                backgroundColor: '#3486eb'
            },

            headerTitleStyle: {
                color: 'white'
              }
        }
    },
    AutoScreen: {
        screen: auto,

        navigationOptions: {
            title: 'Auto',
            headerTintColor: 'white',

            headerStyle: {
                backgroundColor: '#3486eb'
            },

            headerTitleStyle: {
                color: 'white'
              }
        }
    },
    ModalScreen: {
        screen: scoringmodal,

        navigationOptions: {
            title: 'Modal',
            headerTintColor: 'white',

            headerStyle: {
                backgroundColor: '#3486eb'
            },

            headerTitleStyle: {
                color: 'white'
              }
        }
    },

}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack);