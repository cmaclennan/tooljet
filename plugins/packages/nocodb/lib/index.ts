import {
  QueryError,
  QueryResult,
  QueryService,
  ConnectionTestResult,
} from "@tooljet-plugins/common";
import { SourceOptions, QueryOptions } from "./types";
import got, { Headers } from "got";

export default class Nocodb implements QueryService {
  authHeader(token: string): Headers {
    return { "xc-auth": `${token}`, accept: `application/json` };
  }

  async run(
    sourceOptions: SourceOptions,
    queryOptions: QueryOptions
  ): Promise<QueryResult> {
    let result = {};
    let response = null;
    const operation = queryOptions.operation;
    const tableName = queryOptions.table_name;
    const apiKey = sourceOptions.api_key;
    const where = queryOptions.where;
    const sort = queryOptions.sort;
    const primaryKey = queryOptions.primary_key;
    const offset = queryOptions.offset || "";

    try {
      switch (operation) {
        case "list_records": {
          response = await got(
            `https://api/v1/${tableName}/?where=(${tableName},like,${where}%)&sort=${sort}${tableName}&offset=${offset}`,

            {
              method: "get",
              headers: this.authHeader(apiKey),
            }
          );

          result = JSON.parse(response.body);
          break;
        }

        case "retrieve_record": {
          response = await got(`https://api/v1/${tableName}/${primaryKey}`, {
            headers: this.authHeader(apiKey),
          });

          result = JSON.parse(response.body);
          break;
        }

        case "create_record": {
          response = await got(`https://api/v1/${tableName}`, {
            method: "post",
            headers: this.authHeader(apiKey),
            json: {
              records: JSON.parse(queryOptions.body),
            },
          });

          result = JSON.parse(response.body);

          break;
        }

        case "update_record": {
          response = await got(`https://api/v1/${tableName}/${primaryKey}`, {
            method: "patch",
            headers: this.authHeader(apiKey),
            json: {
              records: [
                {
                  id: queryOptions.primary_key,
                  fields: JSON.parse(queryOptions.body),
                },
              ],
            },
          });

          result = JSON.parse(response.body);

          break;
        }

        case "delete_record": {
          response = await got(`https://api/v1/${tableName}/${primaryKey}`, {
            method: "delete",
            headers: this.authHeader(apiKey),
          });
          result = JSON.parse(response.body);

          break;
        }
      }
    } catch (error) {
      console.log(error);
      throw new QueryError("Query could not be completed", error.message, {});
    }

    return {
      status: "ok",
      data: result,
    };
  }
}
