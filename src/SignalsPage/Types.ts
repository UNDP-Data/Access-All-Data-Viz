export interface SignalDataType {
  id: number;
  status: string;
  created_at: string;
  created_by: string;
  modified_at?: string;
  modified_by?: string;
  headline: string;
  description: string;
  attachment?: string;
  steep_primary: string;
  steep_secondary?: string[];
  signature_primary: string;
  signature_secondary?: string[];
  sdgs: string[];
  created_unit: string;
  url: string;
  relevance: string;
  keywords: string[];
  location: string;
  score?: string;
  connected_trends: number[];
  created_for?: string;
}

export interface ChoicesDataType {
  horizons: string[];
  created_for: string[];
  locations: string[];
  ratings: string[];
  roles: string[];
  sdgs: string[];
  signatures: string[];
  steepv: string[];
  unit_names: string[];
  unit_regions: string[];
  scores: string[];
}
