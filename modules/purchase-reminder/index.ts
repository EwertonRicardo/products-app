// Reexport the native module. On web, it will be resolved to PurchaseReminderModule.web.ts
// and on native platforms to PurchaseReminderModule.ts
import PurchaseReminderModule from "./src/PurchaseReminderModule";
export * from "./src/PurchaseReminder.types";

export function addReminder(title: string, date: number): Promise<string> {
  return PurchaseReminderModule.addReminder(title, date);
}
