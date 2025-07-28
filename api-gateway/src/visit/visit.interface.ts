interface Visit {
  id: number;
  visitDate: string;
  patientId: number;
  notes: any[];
}

interface VisitList {
  items: Visit[];
}