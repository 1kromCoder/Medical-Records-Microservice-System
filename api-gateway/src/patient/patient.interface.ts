import { Observable } from 'rxjs';

export interface Visit {
  id: number;
  visitDate: string;
  patientId: number;
}

export interface Patient {
  id: number;
  name: string;
  dob: string;
  doctorId: number;
  // visits: Visit[];
}

export interface PatientList {
  items: Patient[];
}

export interface PatientServiceClient {
  FindAll(data: {}): Observable<PatientList>;
}
