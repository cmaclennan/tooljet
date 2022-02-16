import { QueryError, QueryResult, QueryService } from "@tooljet-plugins/common";
import { SourceOptions, QueryOptions } from "./types";
import got, { Headers } from "got";

export default class Cloudfunctions implements QueryService {
  authHeader(token: string): Headers {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  async run(
    sourceOptions: SourceOptions,
    queryOptions: QueryOptions
  ): Promise<QueryResult> {
    let result = {};
    let response = null;
    const operation = queryOptions.operation;

    const apiKey = sourceOptions.api_key;

    try {
      switch (operation) {
        case "http_triggers": {
          response = await got(
            `https://asia-south1-tooljet-test-338806.cloudfunctions.net/stepin`,
            {
              method: "post",
              headers: this.authHeader(apiKey),
            }
          );

          result = JSON.parse(response.body);
          console.log("response-------->", result);
          break;
        }

        case "pubsub_triggers": {
          // const recordId = queryOptions.record_id;

          response = await got(
            `https://asia-south1-tooljet-test-338806.cloudfunctions.net/stepin`,
            {
              headers: this.authHeader(apiKey),
            }
          );

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
