export interface todoItem {
  id?: number;
  name: string;
  message: string;
  status: boolean;
}

export interface requestData {
  category: {
    id: number;
    name: string;
  };
  id: number;
  name: string;
  photoUrls: string[];
  status: string;
  tags: Array<{ id: number; name: string }>;
}
