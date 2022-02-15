export type SourceOptions = { api_key: string; };
export type QueryOptions = { 
  operation: string; 
  base_id: string; 
  table_name: string; 
  primary_key: string; 
  body: string; 
  offset: string;
  where:string;
  limit:number;
  sort:string;
  fields:string;

};
