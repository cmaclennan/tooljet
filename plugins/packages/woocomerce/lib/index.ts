import { QueryError, QueryResult, QueryService, ConnectionTestResult } from '@tooljet-plugins/common';
import { SourceOptions, QueryOptions } from './types';
const JSON5 = require('json5');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WooCommerceAPI = require('woocommerce-api');

export default class Woocomerce implements QueryService {
  async run(sourceOptions: SourceOptions, queryOptions: QueryOptions, dataSourceId: string): Promise<QueryResult> {
    const operation = queryOptions.operation;
    // const client = await this.getConnection(sourceOptions);
    const result = {};

    try {
      switch (operation) {
        case 'list_product': {
          // const [datasets] = await client.getDatasets(this.parseJSON(queryOptions.options));
          // result = datasets;
          break;
        }
      }
    } catch (error) {
      console.log(error);
      throw new QueryError('Query could not be completed', error.message, {});
    }

    return {
      status: 'ok',
      data: result,
    };
  }

  async getConnection(sourceOptions: any, _options?: object): Promise<any> {
    // Setup:
    const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const WooCommerce = new WooCommerceRestApi({
      url: 'http://example.com', // Your store URL
      consumerKey: 'consumer_key', // Your consumer key
      consumerSecret: 'consumer_secret', // Your consumer secret
      version: 'wc/v3', // WooCommerce WP REST API version
    });
  }

  async testConnection(sourceOptions: SourceOptions): Promise<ConnectionTestResult> {
    // Setup:
    const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
    // import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const WooCommerce = new WooCommerceRestApi({
      url: 'http://example.com', // Your store URL
      consumerKey: 'consumer_key', // Your consumer key
      consumerSecret: 'consumer_secret', // Your consumer secret
      version: 'wc/v3', // WooCommerce WP REST API version
    });

    // if (!client) {
    //   throw new Error('Invalid credentials');
    // }

    // await client.getDatasets();

    return {
      status: 'ok',
    };
  }

  private parseJSON(json?: string): object {
    if (!json) return {};

    return JSON5.parse(json);
  }

  private getPrivateKey(configs?: string): {
    project_id?: string;
    client_email?: string;
    private_key?: string;
  } {
    return this.parseJSON(configs);
  }
}
