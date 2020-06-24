import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import matchlist from '../screens/matchlist'
import prematch from '../screens/prematch'
import scoringmodal from '../screens/ScoringModal'
import Auto from '../screens/auto'
import Teleop from '../screens/teleop'
import Postmatch from '../screens/postmatch'
import QRcode from '../screens/QRCode'

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
        screen: Auto,

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
    TeleopScreen: {
        screen: Teleop,

        navigationOptions: {
            title: 'Teleop',
            headerTintColor: 'white',

            headerStyle: {
                backgroundColor: '#3486eb'
            },

            headerTitleStyle: {
                color: 'white'
              }
        }
    },
    PostmatchScreen: {
        screen: Postmatch,

        navigationOptions: {
            
            headerTintColor: 'white',

            headerStyle: {
                backgroundColor: '#3486eb'
            },

            headerTitleStyle: {
                color: 'white'
              }
        }
    },
    QRCodeScreen: {
        screen: QRcode,

        navigationOptions: {
            headerBackTitle: 'Postmatch',
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