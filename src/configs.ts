import { Iconfigs } from './Types/configTypes';

export const configs: Iconfigs = {
  secret: 'test123',
  memberID: 1
};

export const userDefaults = {
  'member_id': configs.memberID,
  'admin_enabled': 1,
  'admin_notes': '',
  'reseller_notes': '',
  'is_restreamer': 0,
  'allowed_ips': '[]',
  'allowed_ua': '[]',
  'created_at': new Date().getTime(),
  'created_by': configs.memberID,
  'pair_id': null,
  'is_mag': 0,
  'is_e2': 0,
  'force_server_id': 0,
  'is_isplock': 0,
  'as_number': null,
  'isp_desc': '',
  'forced_country': '',
  'is_stalker': 0,
  'bypass_ua': 0,
  'play_token': ''
};
export const userOutputsDefaults = [1, 2, 3];

export default { configs, userDefaults, userOutputsDefaults };
