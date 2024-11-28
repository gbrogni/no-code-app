import { UsageLimit } from './usage-limit';

export interface Project {
  id: string;
  name: string;
  description: string;
  bandWidthLimit: UsageLimit;
  requestLimit: UsageLimit;
  storageLimit: UsageLimit;
}