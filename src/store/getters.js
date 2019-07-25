const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  pubkey: state => state.software.pubkey,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickName: state => state.user.nickName,
  deptId: state => state.user.deptId,
  // permission_routes: state => state.permission.routes,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  permissions: state => state.user.permissions,
  errorLogs: state => state.errorLog.logs
}
export default getters
