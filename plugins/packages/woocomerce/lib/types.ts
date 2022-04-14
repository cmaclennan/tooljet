export type SourceOptions = {
  consumerKey: string;
  consumerSecret: string;
  port: string;
  host: string;
  protocol: string;
};
export type QueryOptions = {
  operation: string;
  data: string;
  key: string;
  body: object | Array<object>;
};
