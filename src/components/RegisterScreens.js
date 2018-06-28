import { Navigation } from 'react-native-navigation'
import DashboardContainer from './containers/DashboardContainer'
import SearchTab from './containers/SearchTab'
import TestComponent from './containers/TestComponents'
import LogTimeSheetContainer from './containers/LogTimeSheetContainer'
import LoginContainer from './containers/LoginContainer'
import SettingContainer from './containers/SettingContainer'
import ProjectIndexContainer from './containers/ProjectIndexContainer'
import ProjectShowContainer from './containers/ProjectShowContainer'
import IssueShowContainer from './containers/IssueShowContainer'
import TimeEntriesContainer from './containers/TimeEntriesContainer'
import ShowProjectInfoLightBox from './presentations/partial/ShowProjectInfoLightBox'

import OrangeHRMIndexContainer from './containers/OrangeHRMIndexContainer'
import OrangeHRMApplyLeaveContainer from './containers/OrangeHRMApplyLeaveContainer'
import OrangeHRMMyLeaveContainer from './containers/OrangeHRMMyLeaveContainer'
import SuccessMessage from './presentations/notification/SuccessMessage'
import ErrorMessage from './presentations/notification/ErrorMessage'

export default (store, Provider) =>  {
	Navigation.registerComponent('Route.LoginContainer', () => LoginContainer, store, Provider)
	Navigation.registerComponent('Route.DashboardContainer', () => DashboardContainer, store, Provider)
	Navigation.registerComponent('Route.SearchTab', () => SearchTab, store, Provider)
	Navigation.registerComponent('Route.TestComponent', () => TestComponent, store, Provider)
	Navigation.registerComponent('Route.LogTimeSheetContainer', () => LogTimeSheetContainer, store, Provider)
	Navigation.registerComponent('Route.SettingContainer', () => SettingContainer, store, Provider)
	Navigation.registerComponent('Route.ProjectIndexContainer', () => ProjectIndexContainer, store, Provider)
	Navigation.registerComponent('Route.ProjectShowContainer', () => ProjectShowContainer, store, Provider)
	Navigation.registerComponent('Route.ShowProjectInfoLightBox', () => ShowProjectInfoLightBox)
	Navigation.registerComponent('Route.IssueShowContainer', () => IssueShowContainer, store, Provider)
	Navigation.registerComponent('Route.TimeEntriesContainer', () => TimeEntriesContainer, store, Provider)
	Navigation.registerComponent('Route.OrangeHRMIndexContainer', () => OrangeHRMIndexContainer, store, Provider)
	Navigation.registerComponent('Route.OrangeHRMApplyLeaveContainer', () => OrangeHRMApplyLeaveContainer, store, Provider)
	Navigation.registerComponent('Route.OrangeHRMMyLeaveContainer', () => OrangeHRMMyLeaveContainer, store, Provider)
	Navigation.registerComponent('Notification.SuccessMessage', () => SuccessMessage)
	Navigation.registerComponent('Notification.ErrorMessage', () => ErrorMessage)
}