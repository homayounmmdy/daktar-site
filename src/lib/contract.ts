// قراردادی که هر فیچر باید پیاده کند.
// هیچ فیچر نباید چیزی غیر از این اکسپورت کند.

import type { PageSnapshot } from "./snapshot";

export type CheckStatus = "pass" | "warn" | "fail" | "skip";

export type Check = {
  id: string;
  status: CheckStatus;
  message: string;
  badge?: string;
  evidence?: string;
};

export type FeatureCategory = "seo" | "performance" | "security" | "a11y";

export type FeatureMeta = {
  id: string;
  label: string;
  description: string;
  category: FeatureCategory;
  enabled: boolean;
};

export type Feature = {
  meta: FeatureMeta;
  evaluate(snapshot: PageSnapshot): Check[];
};