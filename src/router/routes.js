import AppLayout from '@/layouts/AppLayout.vue';
import ChangePassword from '@/views/ChangePassword';
import ConsoleLayout from '@/layouts/ConsoleLayout.vue';
import DateTime from '@/views/Settings/DateTime';
import EventLogs from '@/views/Logs/EventLogs';
import ComponentInfo from '@/views/System/ComponentInfo';
import FactoryReset from '@/views/Operations/FactoryReset';
import Firmware from '@/views/Operations/Firmware';
import Inventory from '@/views/HardwareStatus/Inventory';
import Kvm from '@/views/Operations/Kvm';
import KvmConsole from '@/views/Operations/Kvm/KvmConsole';
import Sessions from '../views/SecurityAndAccess/Sessions';
import Ldap from '@/views/SecurityAndAccess/Ldap';
import UserManagement from '@/views/SecurityAndAccess/UserManagement';
import Login from '@/views/Login';
import LoginLayout from '@/layouts/LoginLayout';
import Network from '@/views/Settings/Network';
import Overview from '@/views/Overview';
import PageNotFound from '@/views/PageNotFound';
import PostCodeLogs from '@/views/Logs/PostCodeLogs';
import PowerRestorePolicy from '@/views/Settings/PowerRestorePolicy';
import ProfileSettings from '@/views/ProfileSettings';
import RebootBmc from '@/views/Operations/RebootBmc';
import ShutdownBmc from '@/views/Operations/ShutdownBmc';
import Policies from '@/views/SecurityAndAccess/Policies';
import KeyClear from '@/views/Operations/KeyClear';
import Sensors from '@/views/HardwareStatus/Sensors';
import Test from '@/views/HardwareStatus/Test';
import SerialOverLan from '@/views/Operations/SerialOverLan';
import SerialOverLanConsole from '@/views/Operations/SerialOverLan/SerialOverLanConsole';
import ServerPowerOperations from '@/views/Operations/ServerPowerOperations';
import Certificates from '@/views/SecurityAndAccess/Certificates';
import VirtualMedia from '@/views/Operations/VirtualMedia';
import Power from '@/views/ResourceManagement/Power';
import SnmpAlerts from '@/views/Settings/SnmpAlerts';
import i18n from '@/i18n';

const roles = {
  administrator: 'Administrator',
  operator: 'Operator',
  readonly: 'ReadOnly',
  noaccess: 'NoAccess',
};

const routes = [
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: Login,
        meta: {
          title: i18n.global.t('appPageTitle.login'),
          requiresAuth: false,
        },
      },
      {
        path: '/change-password',
        name: 'change-password',
        component: ChangePassword,
        meta: {
          title: i18n.global.t('appPageTitle.changePassword'),
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: '/console',
    component: ConsoleLayout,
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: 'serial-over-lan-console',
        name: 'serial-over-lan-console',
        component: SerialOverLanConsole,
        meta: {
          title: i18n.global.t('appPageTitle.serialOverLan'),
        },
      },
      {
        path: 'kvm',
        name: 'kvm-console',
        component: KvmConsole,
        meta: {
          title: i18n.global.t('appPageTitle.kvm'),
        },
      },
    ],
  },
  {
    path: '/',
    meta: {
      requiresAuth: false,
    },
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'overview',
        component: Overview,
        meta: {
          title: i18n.global.t('appPageTitle.overview'),
        },
      },
      {
        path: '/profile-settings',
        name: 'profile-settings',
        component: ProfileSettings,
        meta: {
          title: i18n.global.t('appPageTitle.profileSettings'),
        },
      },
      {
        path: '/system/component-info',
        name: 'component-info',
        component: ComponentInfo,
        meta: {
          title: i18n.global.t('appPageTitle.componentInfo'),
        },
      },
      {
        path: '/logs/event-logs',
        name: 'event-logs',
        component: EventLogs,
        meta: {
          title: i18n.global.t('appPageTitle.eventLogs'),
        },
      },
      {
        path: '/logs/post-code-logs',
        name: 'post-code-logs',
        component: PostCodeLogs,
        meta: {
          title: i18n.global.t('appPageTitle.postCodeLogs'),
        },
      },
      {
        path: '/hardware-status/inventory',
        name: 'inventory',
        component: Inventory,
        meta: {
          title: i18n.global.t('appPageTitle.inventory'),
        },
      },
      {
        path: '/hardware-status/sensors',
        name: 'sensors',
        component: Sensors,
        meta: {
          title: i18n.global.t('appPageTitle.sensors'),
        },
      },
      {
        path: '/hardware-status/test',
        name: 'test',
        component: Test,
        meta: {
          title: i18n.global.t('appPageTitle.test'),
        },
      },
      {
        path: '/security-and-access/sessions',
        name: 'sessions',
        component: Sessions,
        meta: {
          title: i18n.global.t('appPageTitle.sessions'),
        },
      },
      {
        path: '/security-and-access/ldap',
        name: 'ldap',
        component: Ldap,
        meta: {
          title: i18n.global.t('appPageTitle.ldap'),
        },
      },
      {
        path: '/security-and-access/user-management',
        name: 'user-management',
        component: UserManagement,
        meta: {
          title: i18n.global.t('appPageTitle.userManagement'),
        },
      },
      {
        path: '/security-and-access/policies',
        name: 'policies',
        component: Policies,
        meta: {
          title: i18n.global.t('appPageTitle.policies'),
        },
      },
      {
        path: '/security-and-access/certificates',
        name: 'certificates',
        component: Certificates,
        meta: {
          title: i18n.global.t('appPageTitle.certificates'),
        },
      },
      {
        path: '/settings/date-time',
        name: 'date-time',
        component: DateTime,
        meta: {
          title: i18n.global.t('appPageTitle.dateTime'),
        },
      },
      {
        path: '/settings/snmp-alerts',
        name: 'snmp-alerts',
        component: SnmpAlerts,
        meta: {
          title: i18n.global.t('appPageTitle.snmpAlerts'),
        },
      },
      {
        path: '/operations/factory-reset',
        name: 'factory-reset',
        component: FactoryReset,
        meta: {
          title: i18n.global.t('appPageTitle.factoryReset'),
        },
      },
      {
        path: '/operations/key-clear',
        name: 'key-clear',
        component: KeyClear,
        meta: {
          title: i18n.global.t('appPageTitle.keyClear'),
        },
      },
      {
        path: '/operations/kvm',
        name: 'kvm',
        component: Kvm,
        meta: {
          title: i18n.global.t('appPageTitle.kvm'),
        },
      },
      {
        path: '/operations/firmware',
        name: 'firmware',
        component: Firmware,
        meta: {
          title: i18n.global.t('appPageTitle.firmware'),
        },
      },
      {
        path: '/settings/network',
        name: 'network',
        component: Network,
        meta: {
          title: i18n.global.t('appPageTitle.network'),
        },
      },
      {
        path: '/settings/power-restore-policy',
        name: 'power-restore-policy',
        component: PowerRestorePolicy,
        meta: {
          title: i18n.global.t('appPageTitle.powerRestorePolicy'),
        },
      },
      {
        path: '/resource-management/power',
        name: 'power',
        component: Power,
        meta: {
          title: i18n.global.t('appPageTitle.power'),
        },
      },
      {
        path: '/operations/reboot-bmc',
        name: 'reboot-bmc',
        component: RebootBmc,
        meta: {
          title: i18n.global.t('appPageTitle.rebootBmc'),
        },
      },
      {
        path: '/operations/shutdown-bmc',
        name: 'shutdown-bmc',
        component: ShutdownBmc,
        meta: {
          title: i18n.global.t('appPageTitle.shutdownBmc'),
        },
      },
      {
        path: '/operations/serial-over-lan',
        name: 'serial-over-lan',
        component: SerialOverLan,
        meta: {
          title: i18n.global.t('appPageTitle.serialOverLan'),
          exclusiveToRoles: [roles.administrator],
        },
      },
      {
        path: '/operations/server-power-operations',
        name: 'server-power-operations',
        component: ServerPowerOperations,
        meta: {
          title: i18n.global.t('appPageTitle.serverPowerOperations'),
        },
      },
      {
        path: '/operations/virtual-media',
        name: 'virtual-media',
        component: VirtualMedia,
        meta: {
          title: i18n.global.t('appPageTitle.virtualMedia'),
          exclusiveToRoles: [roles.administrator],
        },
      },
      {
        path: '*',
        name: 'page-not-found',
        component: PageNotFound,
        meta: {
          title: i18n.global.t('appPageTitle.pageNotFound'),
        },
      },
    ],
  },
];

export { routes as default, roles };
