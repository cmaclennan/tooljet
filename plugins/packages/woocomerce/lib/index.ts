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
        case 'list_customer': {
          break;
        }
        case 'update_customer': {
          break;
        }
        case 'delete_customer': {
          break;
        }
        case 'batch_update_customer': {
          break;
        }
        case 'create_customer': {
          break;
        }
        case 'retreive_customer': {
          break;
        }
        case 'list_product': {
          break;
        }
        case ' update_product': {
          break;
        }
        case 'delete_product': {
          break;
        }
        case 'batch_update_product': {
          break;
        }
        case 'create_product': {
          break;
        }
        case 'retreive_product': {
          break;
        }
        case 'list_order': {
          break;
        }
        case 'update_order': {
          break;
        }
        case ' delete_order': {
          break;
        }
        case 'batch_update_order': {
          break;
        }
        case 'create_order': {
          break;
        }
        case 'retreive_order': {
          break;
        }
        case 'list_coupon': {
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
    const { host, consumerKey, consumerSecret } = sourceOptions;
    const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
    const WooCommerce = new WooCommerceRestApi({
      url: host, // Your store URL
      consumerKey: consumerKey, // Your consumer key
      consumerSecret: consumerSecret, // Your consumer secret
      version: 'wc/v3', // WooCommerce WP REST API version
    });
    return WooCommerce;
  }

  async testConnection(sourceOptions: SourceOptions): Promise<ConnectionTestResult> {
    const { host, consumerKey, consumerSecret } = sourceOptions;
    const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
    const WooCommerce = new WooCommerceRestApi({
      url: host, // Your store URL
      consumerKey: consumerKey, // Your consumer key
      consumerSecret: consumerSecret, // Your consumer secret
      version: 'wc/v3', // WooCommerce WP REST API version
    });

    if (!WooCommerce) {
      throw new Error('Invalid credentials');
    }

    // await WooCommerce.getDatasets();

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
