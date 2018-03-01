import React from 'react'
import { AppRegistry, Platform, AsyncStorage, StyleSheet, Image, Text, View } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

// import SplashScreen from '../views/SplashScreen'
// import Map from '../views/Map'
// import Upload from '../views/Upload'
// import UserDetails from '../views/UserDetails'
// import Points from '../views/Points'
// import PointView from '../views/PointView'
// import RotatePoint from '../views/RotateTest'

import Feed from '../../views/Feed'
import SearchView from '../../views/SearchView'
import Profile from '../../views/Profile'
import OtherProfile from '../../views/OtherProfile'
import Settings from '../../components/Profile/Settings'
import Friends from '../../views/Friends'
import Albums from '../../views/Albums'
import LoginScreen from '../../views/LoginScreen'
import ImagesTab from '../../components/Media/ImagesTab/ImagesTab'
import SelectImagesGrid from '../../components/Media/ImagesTab/SelectImagesGrid'
import AlbumGrid from '../../components/Media/AlbumTab/AlbumGrid'
import AlbumView from '../../components/Media/AlbumTab/AlbumView'
import AlbumSettings from '../../components/Media/AlbumTab/AlbumSettings'
import NewAlbum from '../../components/Media/AlbumTab/NewAlbum'
import EnlargedImage from '../../components/EnlargedImage'
import EditProfile from '../../components/Profile/EditProfile'
import Notifications from '../../views/Notifications'

let images = {
      BellFilled: {img: require('../../res/TabBarIcons/BellFilled.png')},
      Bell: {img: require('../../res/TabBarIcons/Bell.png')},
      search2 : {img: require('../../res/TabBarIcons/search2/search2.png')},
      search: {img: require('../../res/TabBarIcons/search/search.png')},
      home2: {img: require('../../res/TabBarIcons/home2/home2.png')},
      home: {img: require('../../res/TabBarIcons/home/home.png')},
      profile2: {img: require('../../res/TabBarIcons/profile2/profile2.png')},
      profile: {img: require('../../res/TabBarIcons/profile/profile.png')},
  }

export function createNavigationOption(title) {
   var options = []
   if (!(Platform.OS === 'ios')) {
      Object.assign(options, { header: null })
   }
   return options
}

let navigationOptionsEnlargedImage = ({ navigation }) => ({
   tabBarVisible: false,
   headerTitle: 'Photo', // `${}`
   headerTintColor: 'black',
   headerStyle: {
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
   }
})

let navigationOptionsAlbumView = ({ navigation }) => (
   {
      tabBarVisible: false,
      headerTitle: 'Album',
      headerTintColor: 'black',
      headerStyle: {
         backgroundColor: 'white'
      }
   })

let navigationOptionsOtherProfile = ({ navigation }) => ({
   tabBarVisible: false,
   headerTitle: '', //`${'navigation.state.params.payload.fullName'}`,
   headerStyle: {
      backgroundColor: 'white'
   },
   headerTitleStyle: {
      fontSize: 20,
      fontWeight: '400',
   },
})

let navigationOptionsNotifications = ({ navigation }) => ({
   headerTitle: 'Notifications',
   tabBarLabel: 'Notifications',
   tabBarIcon: ({ tintColor, focused }) => {
      return (
         <View style={{
            zIndex: 0,
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'space-around',
            alignItems: 'center'
         }}>
            <Image
               style={{ height: 27, width: 28 }}
               source={ focused ? images.BellFilled.img : images.Bell.img } />
            {navigation.state && navigation.state.params && navigation.state.params.hasNotifications ?
               <View style={{
                  position: 'absolute',
                  top: 7,
                  left: 3,
                  backgroundColor: 'red',
                  height: 10,
                  width: 10,
                  borderRadius: 30,
                  zIndex: 2
               }}>
               </View>
               : undefined}
         </View>
      )
   }
})

export const ProfileStack = StackNavigator({
   Profile: {
      screen: Profile,
      navigationOptions: {
         header: null,
      },
   },
   OtherProfile: {
      screen: OtherProfile,
      navigationOptions: navigationOptionsOtherProfile
   },
   Settings: {
      screen: Settings,
      navigationOptions: createNavigationOption('Settings'),
   },
   EnlargedImage: {
      screen: EnlargedImage,
      navigationOptions: navigationOptionsEnlargedImage,
   },
   AlbumGrid: {
      screen: AlbumGrid,
      navigationOptions: {
         header: null,
      },
   },
   AlbumView: {
      screen: AlbumView,
      navigationOptions: navigationOptionsAlbumView,
   },
   ImagesTab: {
      screen: ImagesTab,
      navigationOptions: navigationOptionsAlbumView,
   },
   SelectImagesGrid: {
      screen: SelectImagesGrid,
      navigationOptions: navigationOptionsAlbumView,
   },
   NewAlbum: {
      screen: NewAlbum,
      navigationOptions: {
         headerTitle: 'Create new album',
         headerTitleStyle: {
            fontSize: 20,
            fontWeight: '100',
         },
         headerStyle: {
            backgroundColor: 'white'
         }
      }
   },
   AlbumSettings: {
      screen: AlbumSettings,
      navigationOptions: {
         headerTitle: 'Album settings',
         headerTitleStyle: {
            fontSize: 20,
            fontWeight: '100',
         },
         headerStyle: {
            backgroundColor: 'white'
         }
      }
   },
   Friends: {
      screen: Friends,
      navigationOptions: createNavigationOption('Friends'),
   },
   EditProfile: {
      screen: EditProfile,
      navigationOptions: {
         tabBarVisible: false,
         headerTitle: 'Edit profile',
         headerTintColor: 'black',
         headerStyle: {
            backgroundColor: 'white'
         }
      },
   },
})

export const FeedStack = StackNavigator({
   Feed: {
      screen: Feed,
      navigationOptions: {
         header: null,
      },
   },
   EnlargedImage: {
      screen: EnlargedImage,
      navigationOptions: navigationOptionsEnlargedImage,
   },
   OtherProfile: {
      screen: OtherProfile,
      navigationOptions: navigationOptionsOtherProfile
   },
})

export const NotificationStack = StackNavigator({
   Notifications: {
      screen: Notifications,
      navigationOptions: navigationOptionsNotifications,
   },
   AlbumView: {
      screen: AlbumView,
      navigationOptions: navigationOptionsAlbumView,
   },
   OtherProfile: {
      screen: OtherProfile,
      navigationOptions: navigationOptionsOtherProfile
   },
})

export const SearchStack = StackNavigator({
   SearchView: {
      screen: SearchView,
      navigationOptions: {
         tabBarLabel: 'Search',
         tabBarIcon: ({ tintColor, focused }) => {
            return (<Image
               style={{ height: 27, width: 27 }}
               source={focused ? images.search2.img : images.search.img } />)
         }
      },
   },
   OtherProfile: {
      screen: OtherProfile,
      navigationOptions: navigationOptionsOtherProfile
   },
   AlbumView: {
      screen: AlbumView,
      navigationOptions: navigationOptionsAlbumView,
   },
   EnlargedImage: {
      screen: EnlargedImage,
      navigationOptions: navigationOptionsEnlargedImage,
   },
})

export const Tabs = TabNavigator({
   Feed: {
      screen: FeedStack,
      navigationOptions: {
         tabBarLabel: 'Feed',
         tabBarIcon: ({ tintColor, focused }) => {
            return (<Image
               style={{ height: 27, width: 27 }}
               source={focused ? images.home2.img : images.home.img } />)
         }
      },
   },
   Notifications: {
      screen: NotificationStack,
   },
   SearchView: {
      screen: SearchStack,
   },
   // Map: {
   //   screen: Map,
   //   navigationOptions: {
   //     tabBarLabel: 'Map',
   //     tabBarIcon: ({ tintColor }) => <Icon name="map" size={25} color={tintColor} />
   //   },
   Profile: {
      screen: ProfileStack,
      navigationOptions: {
         tabBarLabel: 'Profile',
         tabBarIcon: ({ tintColor, focused }) => {
            return (<Image
               style={{ height: 28, width: 18 }}
               source={focused ? images.profile2.img : images.profile.img} />)
         }
      },
   },
}, {
      tabBarPosition: 'bottom',
      TabNavigatorConfig: {
         initialRouteName: 'Profile',
      },
      tabBarOptions: {
         tabBarVisible: false,
         showLabel: false,
         showIcon: true,

         /*This is needed for the icons to not cut off on andoid. Change as little as possible*/
         iconStyle: {
           width: 35,
           height: 35,
           paddingBottom: 10,
         },

         style: {
            backgroundColor: 'rgba(256, 256, 256, 0.9)',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0
         }
      },
   })

   // StartupStack
const navigator = StackNavigator({
   // SplashScreen: {
   //   screen: SplashScreen,
   //   navigationOptions: {
   //     title: 'SplashScreen',
   //     header: null,
   //   },
   // },
   LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
         title: 'Login',
         header: null,
      },
   },
   Tabs: {
      screen: Tabs,
      navigationOptions: {
         title: 'tabs',
         header: null,
      },
   },
})

export default navigator
