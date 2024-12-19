import api from '@/store/api';

const HOST_STATE = {
  on: 'xyz.openbmc_project.State.Host.HostState.Running',
  off: 'xyz.openbmc_project.State.Host.HostState.Off',
  error: 'xyz.openbmc_project.State.Host.HostState.Quiesced',
  diagnosticMode: 'xyz.openbmc_project.State.Host.HostState.DiagnosticMode',
};

const serverStateMapper = (hostState) => {
  switch (hostState) {
    case HOST_STATE.on:
    case 'On':
      return 'on';
    case HOST_STATE.off:
    case 'Off':
      return 'off';
    case HOST_STATE.error:
    case 'Quiesced':
      return 'error';
    case HOST_STATE.diagnosticMode:
    case 'InTest':
      return 'diagnosticMode';
    default:
      return 'unreachable';
  }
};

const GlobalStore = {
  namespaced: true,
  state: {
    assetTag: null,
    bmcTime: null,
    modelType: null,
    serialNumber: null,
    serverStatus: 'unreachable',
    languagePreference: localStorage.getItem('storedLanguage') || 'en-US',
    isUtcDisplay: localStorage.getItem('storedUtcDisplay')
      ? JSON.parse(localStorage.getItem('storedUtcDisplay'))
      : true,
    username: localStorage.getItem('storedUsername'),
    isAuthorized: true,
    userPrivilege: null,
  },
  getters: {
    assetTag: (state) => state.assetTag,
    modelType: (state) => state.modelType,
    serialNumber: (state) => state.serialNumber,
    serverStatus: (state) => state.serverStatus,
    bmcTime: (state) => state.bmcTime,
    languagePreference: (state) => state.languagePreference,
    isUtcDisplay: (state) => state.isUtcDisplay,
    username: (state) => state.username,
    isAuthorized: (state) => state.isAuthorized,
    userPrivilege: (state) => state.userPrivilege,
  },
  mutations: {
    setAssetTag: (state, assetTag) => (state.assetTag = assetTag),
    setModelType: (state, modelType) => (state.modelType = modelType),
    setSerialNumber: (state, serialNumber) =>
      (state.serialNumber = serialNumber),
    setBmcTime: (state, bmcTime) => (state.bmcTime = bmcTime),
    setServerStatus: (state, serverState) =>
      (state.serverStatus = serverStateMapper(serverState)),
    setLanguagePreference: (state, language) =>
      (state.languagePreference = language),
    setUsername: (state, username) => (state.username = username),
    setUtcTime: (state, isUtcDisplay) => (state.isUtcDisplay = isUtcDisplay),
    setUnauthorized: (state) => {
      state.isAuthorized = false;
      window.setTimeout(() => {
        state.isAuthorized = true;
      }, 100);
    },
    setPrivilege: (state, privilege) => {
      state.userPrivilege = privilege;
    },
  },
  actions: {
    async getBmcPath() {
      try {
        const serviceRoot = await api.get('/redfish/v1');
        const bmcPath =
          serviceRoot?.data?.ManagerProvidingService?.['@odata.id'];
        if (!bmcPath) {
          const managers = await api.get('/redfish/v1/Managers');
          const managerPath = managers?.data?.Members?.[0]?.['@odata.id'];
          if (!managerPath) {
            throw new Error('No BMC path found');
          }
          return managerPath;
        }
        return bmcPath;
      } catch (error) {
        console.error('Error fetching BMC path:', error);
      }
    },
    async getSystemPath() {
      try {
        const systems = await api.get('/redfish/v1/Systems');
        const systemPath = systems?.data?.Members?.[0]?.['@odata.id'];
        if (!systemPath) {
          throw new Error('No system path found');
        }
        return systemPath;
      } catch (error) {
        console.error('Error fetching system path:', error);
      }
    },
    async getBmcTime({ commit }) {
      try {
        const bmcPath = await this.dispatch('global/getBmcPath');
        const response = await api.get(bmcPath);
        const bmcDateTime = response.data.DateTime;
        const date = new Date(bmcDateTime);
        commit('setBmcTime', date);
      } catch (error) {
        console.error('Error fetching BMC time:', error);
      }
    },
    async getSystemInfo({ commit }) {
      try {
        const systemPath = await this.dispatch('global/getSystemPath');
        const response = await api.get(systemPath);
        const {
          AssetTag,
          Model,
          PowerState,
          SerialNumber,
          Status: { State } = {},
        } = response.data;

        commit('setAssetTag', AssetTag);
        commit('setSerialNumber', SerialNumber);
        commit('setModelType', Model);
        if (State === 'Quiesced' || State === 'InTest') {
          commit('setServerStatus', State);
        } else {
          commit('setServerStatus', PowerState);
        }
      } catch (error) {
        console.error('Error fetching system info:', error);
      }
    },
  },
};

export default GlobalStore;
