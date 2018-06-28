import {Navigation} from 'react-native-navigation'

const startApp = (root,logged_user = 'anonymous',redirectTo = {}) => {
    switch (root) {
        case 'login':
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'Route.LoginContainer', // unique ID registered with Navigation.registerScreen
                title: 'Login to Redmine', // title of the screen as appears in the nav bar (optional)
                navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
            },
            portraitOnlyMode: true,
            appStyle: {
                navBarBackgroundColor: '#3E5B76',
                navBarTextColor: '#ffffff',
                navBarTextFontFamily: 'Roboto',
                navBarButtonColor: '#ffffff'
            },
            animationType: 'slide-down'
        })
        return
        case 'after-login':
            Navigation.startTabBasedApp({
                tabs: [
                    {
                        label: 'Search',
                        screen: 'Route.SearchTab',
                        icon: require('./img/search.png'),
                        selectedIcon: require('./img/search.png'),
                        title: 'Search',
                        navigatorStyle: {}
                    },
                    {
                        label: 'Home',
                        screen: 'Route.DashboardContainer',
                        icon: require('./img/home.png'),
                        selectedIcon: require('./img/home.png'),
                        title: `Welcome ${logged_user}`,
                        navigatorStyle: {},
                        passProps:{redirectTo : redirectTo}
                    },
                    {
                        label: 'Setting',
                        screen: 'Route.SettingContainer',
                        icon: require('./img/setting.png'),
                        selectedIcon: require('./img/setting.png'),
                        title: 'Setting',
                        navigatorStyle: {}
                    }              
                ],
                appStyle: {
                    tabBarBackgroundColor: '#3E5B76', // optional, change the background color of the tab bar
                    tabBarButtonColor: '#ffffff',
                    tabBarSelectedButtonColor: '#63d7cc',
                    tabBarTranslucent: true,
                    tabFontSize: 12,
                    selectedTabFontSize: 16,
                    navBarBackgroundColor: '#3E5B76',
                    navBarTextColor: '#ffffff',
                    navBarTextFontFamily: 'Roboto',
                    navBarButtonColor: '#ffffff',
                    forceTitlesDisplay: true,
                    initialTabIndex: 1
                },
                animationType: 'slide-down'            
            })
        return
        default: 
        console.log("Not Root Found")
    }
}
export default startApp