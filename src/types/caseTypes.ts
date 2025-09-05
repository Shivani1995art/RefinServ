import { ReactNode } from 'react';

export interface CaseItem {
  fullName: string;
  createdAt: string | Date;
  status: string;
  _id: string;
  // Add other case properties as needed
  [key: string]: any; // Allow additional properties for flexibility
}

export interface CaseItemProps {
  item: CaseItem;
  onPress: () => void;
}