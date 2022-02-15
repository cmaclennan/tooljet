import { QueryError, QueryResult, QueryService, ConnectionTestResult } from '@tooljet-plugins/common';
import { SourceOptions, QueryOptions } from './types';
const {CloudFunctionsServiceClient} = require('@google-cloud/functions');
const client = new CloudFunctionsServiceClient();

export default class Cloudfunctions implements QueryService {
  async run(sourceOptions: SourceOptions, queryOptions: QueryOptions, dataSourceId: string): Promise<QueryResult> {
    return {
      status: 'ok',
      data: {},
    };
  }

  async testConnection(sourceOptions: SourceOptions): Promise<ConnectionTestResult> {
    // const client: Storage = await this.getConnection(sourceOptions);

    return {
      status: 'ok',
    };
  }


}
