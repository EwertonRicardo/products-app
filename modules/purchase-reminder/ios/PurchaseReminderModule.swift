import ExpoModulesCore
import EventKit

public class PurchaseReminderModule: Module {
  public func definition() -> ModuleDefinition {
    Name("PurchaseReminder")

    AsyncFunction("addReminder") { (title: String, date: Double) -> String in
      let store = EKEventStore()

      return try await withCheckedThrowingContinuation { cont in
        store.requestAccess(to: .event) { granted, error in
          if let error = error {
            cont.resume(throwing: error)
            return
          }

          guard granted else {
            cont.resume(throwing: NSError(
              domain: "Calendar",
              code: 1,
              userInfo: [NSLocalizedDescriptionKey: "Permission denied"]
            ))
            return
          }

          let event = EKEvent(eventStore: store)
          event.title = title
          event.startDate = Date(timeIntervalSince1970: date / 1000)
          event.endDate = event.startDate.addingTimeInterval(3600)
          event.calendar = store.defaultCalendarForNewEvents

          do {
            try store.save(event, span: .thisEvent)
            cont.resume(returning: "Event added successfully")
          } catch {
            cont.resume(throwing: error)
          }
        }
      }
    }
  }
}
