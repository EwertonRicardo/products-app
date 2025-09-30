import PurchaseReminderModule from "./PurchaseReminderModule";
export * from "./PurchaseReminder.types";

export function addReminder(title: string, date: number): Promise<string> {
  return PurchaseReminderModule.addReminder(title, date);
}
