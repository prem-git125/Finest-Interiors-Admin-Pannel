import { combineReducers } from "redux"
import { ProductSlice, adminUser, adminLogin, adminDesigner, adminDesignerApproval, FetchingUserJobsheet, adminCertifiedDesigners, userdesignerCharts, JobsheetCounts, MostAppliedDesignerChart, FetchingBlockedUsers, HiredDesigners, DesignerPayment } from '../slice'

const staticReducers = {
   product: ProductSlice,
   adminUser: adminUser,
   adminCertifiedDesigners: adminCertifiedDesigners,
   adminLogin: adminLogin,
   adminDesigner: adminDesigner,
   adminDesignerApproval: adminDesignerApproval,
   FetchingUserJobsheet: FetchingUserJobsheet,
   userdesignerCharts: userdesignerCharts,
   JobsheetCounts: JobsheetCounts,
   MostAppliedDesignerChart: MostAppliedDesignerChart,
   FetchingBlockedUsers: FetchingBlockedUsers,
   HiredDesigners: HiredDesigners,
   DesignerPayment: DesignerPayment
}

const createRootReducer = (asyncReducers) => {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers,
    })
}

const rootReducers = (state, action) => {
    const combinedReducer = createRootReducer()
    return combinedReducer(state, action)
}

export default rootReducers
