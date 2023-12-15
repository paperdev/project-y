import { iProfile, iProfileAll } from '@/shared/interface/profile';
import profileData from './json/profile.json';

let profileAll: iProfileAll = profileData;
let profile: iProfile = profileData.profile;

export {
  profileAll,
  profile,
}