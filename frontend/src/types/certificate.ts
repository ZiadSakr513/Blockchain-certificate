export interface Certificate {
  certificateId: string;
  studentName: string;
  courseName: string;
  organization: string;
  dateIssued: number;
  grade: string;
  ipfsHash: string;
  exists: boolean;
}

export interface CertificateFormData {
  certificateId: string;
  studentName: string;
  courseName: string;
  organization: string;
  dateIssued: string;
  grade: string;
  ipfsHash: string;
}
