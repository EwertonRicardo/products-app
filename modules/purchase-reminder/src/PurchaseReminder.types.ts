export type PurchaseReminderModuleEvents = {
  addReminder(title: string, date: number): Promise<string>;
};
