/* eslint-disable */

import { ChapterOutput } from "./eval.types";

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file by running:
 * "npx ts-node tools/src/tester/_generate_story_types.ts" in a terminal.
 */

/**
 * This interface was referenced by `Story`'s JSON-Schema
 * via the `definition` "SupplementalChapter".
 */
export type SupplementalChapter = ChapterRequest & {
  /**
   * Array of success HTTP status codes. Default to [200, 201].
   */
  status?: number[];
};
/**
 * This interface was referenced by `Story`'s JSON-Schema
 * via the `definition` "Parameter".
 */
export type Parameter = (string | number | boolean)[] | string | number | boolean;
/**
 * This interface was referenced by `Story`'s JSON-Schema
 * via the `definition` "Payload".
 */
export type Payload = {} | any[] | string | number | boolean;
/**
 * This interface was referenced by `Story`'s JSON-Schema
 * via the `definition` "Chapter".
 */
export type Chapter = ChapterRequest & {
  /**
   * A brief description of the chapter.
   */
  synopsis: string;
  response?: ExpectedResponse;
};
/**
 * This interface was referenced by `Story`'s JSON-Schema
 * via the `definition` "ReadChapter".
 */
export type ReadChapter = Chapter & {
  response: ActualResponse;
};

export interface Story {
  $schema?: string;
  /**
   * If true, the story will be skipped.
   */
  skip?: boolean;
  description: string;
  prologues?: SupplementalChapter[];
  epilogues?: SupplementalChapter[];
  /**
   * @minItems 1
   */
  chapters: Chapter[];
}
/**
 * This interface was referenced by `Story`'s JSON-Schema
 * via the `definition` "ChapterRequest".
 */
export interface ChapterRequest {
  id?: string;
  path: string;
  method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  parameters?: {
    [k: string]: Parameter;
  };
  request_body?: RequestBody;
  output?: Output;
}
/**
 * This interface was referenced by `Story`'s JSON-Schema
 * via the `definition` "RequestBody".
 */
export interface RequestBody {
  content_type?: string;
  payload: Payload;
}
/**
 * Describes output for a chapter.
 * The keys are the names for the variable in the chapter output.
 * The values are paths to the values in the response.
 * The values should be in the form:
 *  - `payload.<payload-path>` for the payload
 *  - `headers.<header-name>` for the headers
 */
export type Output = { [k: string]: string };
/**
 * This interface was referenced by `Story`'s JSON-Schema
 * via the `definition` "ExpectedResponse".
 */
export interface ExpectedResponse {
  /**
   * The expected HTTP status code. Default to 200.
   */
  status: number;
  content_type?: string;
  payload?: Payload;
}
/**
 * This interface was referenced by `Story`'s JSON-Schema
 * via the `definition` "ActualResponse".
 */
export interface ActualResponse {
  status: number;
  content_type: string;
  payload: Payload;
  /**
   * Error message for non 2XX responses.
   */
  message?: string;
  /**
   * Error object.
   */
  error?: {};
}
