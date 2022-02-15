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
    return {'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoZXJmaW5AdG9vbGpldC5pbyIsImZpcnN0bmFtZSI6bnVsbCwibGFzdG5hbWUiOm51bGwsImlkIjoxLCJyb2xlcyI6InVzZXIiLCJpYXQiOjE2NDQ5MDQ3MzZ9.Jkpjyk7kak4-GM61vhYld8jEsHb9Zri9s16OK-Yjvrc','Content-Type': 'application/json'  };
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
            `http://tj-noco.herokuapp.com/nc/test_h9x6/api/v1/users`,

            {
              method: "get",
              headers: this.authHeader('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0ZXBpbmZ3ZEBnbWFpbC5jb20iLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJpZCI6MSwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNjQ0ODMxMjA0fQ.zd8pJTkiUDeUxFZgKL9Hcl2Mk5zaVsjGQgJAxL35UdA'),
            }
          );
          console.log("checker",response)
          result = JSON.parse(response.body);
          break;
        }

        case "retrieve_record": {
          response = await got(`http://localhost:8080/nc/ss_91i4/api/v1/`, {
            headers: this.authHeader(apiKey),
          });

          result = JSON.parse(response.body);
          break;
        }

        case "create_record": {
          response = await got(`http://localhost:8080/nc/ss_91i4/api/v1/tabler`, {
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
          response = await got(`http://localhost:8080/nc/ss_91i4/api/v1/`, {
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
          response = await got(`http://localhost:8080/nc/ss_91i4/api/v1/`, {
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

function res(arg0: string, res: any) {
  throw new Error("Function not implemented.");
}

