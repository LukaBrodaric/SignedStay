interface CheckInData {
  guestName: string;
  guestEmail: string;
  numberOfGuests: number;
  arrivalDate: string | Date;
  departureDate: string | Date;
  estimatedDepartureHour: string;
  depositConfirmed: boolean;
  conditionConfirmed: boolean;
  createdAt: string | Date;
}

interface CheckOutData {
  guestName: string;
  depositReturned: boolean;
  incidentDescription: string | null;
  createdAt: string | Date;
}

export type CheckInColumn = 
  | "guestName" 
  | "guestEmail" 
  | "numberOfGuests" 
  | "arrivalDate" 
  | "departureDate" 
  | "estimatedDepartureHour" 
  | "depositConfirmed" 
  | "conditionConfirmed" 
  | "submissionDate";

export type CheckOutColumn = 
  | "guestName" 
  | "depositReturned" 
  | "incidentDescription" 
  | "submissionDate";

export const CHECK_IN_COLUMNS: { key: CheckInColumn; label: string }[] = [
  { key: "guestName", label: "Guest Name" },
  { key: "guestEmail", label: "Email" },
  { key: "numberOfGuests", label: "Number of Guests" },
  { key: "arrivalDate", label: "Arrival Date" },
  { key: "departureDate", label: "Departure Date" },
  { key: "estimatedDepartureHour", label: "Estimated Departure Hour" },
  { key: "depositConfirmed", label: "Deposit Confirmed" },
  { key: "conditionConfirmed", label: "Condition Confirmed" },
  { key: "submissionDate", label: "Submission Date" },
];

export const CHECK_OUT_COLUMNS: { key: CheckOutColumn; label: string }[] = [
  { key: "guestName", label: "Guest Name" },
  { key: "depositReturned", label: "Deposit Returned" },
  { key: "incidentDescription", label: "Incident Description" },
  { key: "submissionDate", label: "Submission Date" },
];

function escapeCsvValue(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportCheckInsCsv(
  checkIns: CheckInData[],
  selectedColumns: CheckInColumn[],
  propertyName: string
): void {
  if (selectedColumns.length === 0) return;

  const headers = selectedColumns.map((col) => {
    const colInfo = CHECK_IN_COLUMNS.find((c) => c.key === col);
    return colInfo ? colInfo.label : col;
  });

  const rows = checkIns.map((checkIn) => {
    return selectedColumns.map((col) => {
      let value: string;
      switch (col) {
        case "guestName":
          value = checkIn.guestName;
          break;
        case "guestEmail":
          value = checkIn.guestEmail;
          break;
        case "numberOfGuests":
          value = checkIn.numberOfGuests.toString();
          break;
        case "arrivalDate":
          value = new Date(checkIn.arrivalDate).toLocaleDateString();
          break;
        case "departureDate":
          value = new Date(checkIn.departureDate).toLocaleDateString();
          break;
        case "estimatedDepartureHour":
          value = checkIn.estimatedDepartureHour;
          break;
        case "depositConfirmed":
          value = checkIn.depositConfirmed ? "Yes" : "No";
          break;
        case "conditionConfirmed":
          value = checkIn.conditionConfirmed ? "Yes" : "No";
          break;
        case "submissionDate":
          value = new Date(checkIn.createdAt).toLocaleDateString();
          break;
        default:
          value = "";
      }
      return escapeCsvValue(value);
    });
  });

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const safeName = propertyName.replace(/[^a-zA-Z0-9]/g, "-");
  const dateStr = new Date().toISOString().split("T")[0];
  link.download = `checkins-${safeName}-${dateStr}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportCheckOutsCsv(
  checkOuts: CheckOutData[],
  selectedColumns: CheckOutColumn[],
  propertyName: string
): void {
  if (selectedColumns.length === 0) return;

  const headers = selectedColumns.map((col) => {
    const colInfo = CHECK_OUT_COLUMNS.find((c) => c.key === col);
    return colInfo ? colInfo.label : col;
  });

  const rows = checkOuts.map((checkOut) => {
    return selectedColumns.map((col) => {
      let value: string;
      switch (col) {
        case "guestName":
          value = checkOut.guestName;
          break;
        case "depositReturned":
          value = checkOut.depositReturned ? "Yes" : "No";
          break;
        case "incidentDescription":
          value = checkOut.incidentDescription || "None";
          break;
        case "submissionDate":
          value = new Date(checkOut.createdAt).toLocaleDateString();
          break;
        default:
          value = "";
      }
      return escapeCsvValue(value);
    });
  });

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const safeName = propertyName.replace(/[^a-zA-Z0-9]/g, "-");
  const dateStr = new Date().toISOString().split("T")[0];
  link.download = `checkouts-${safeName}-${dateStr}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}