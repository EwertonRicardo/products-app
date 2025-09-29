import { NativeModule, requireNativeModule } from "expo";

import { PurchaseReminderModuleEvents } from "./PurchaseReminder.types";

declare class PurchaseReminderModule extends NativeModule<PurchaseReminderModuleEvents> {
  addReminder(title: string, date: number): Promise<string>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PurchaseReminderModule>("PurchaseReminder");
