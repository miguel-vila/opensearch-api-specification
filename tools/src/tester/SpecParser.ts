import { type OpenAPIV3 } from 'openapi-types'
import { resolve_ref } from '../../helpers'
import { type Chapter } from './types/story.types'
import { type ParsedOperation } from './types/spec.types'
import _ from 'lodash'

export default class SpecParser {
  private readonly spec: OpenAPIV3.Document
  private cached_operations: Record<string, ParsedOperation> = {}

  constructor (spec: OpenAPIV3.Document) {
    this.spec = spec
  }

  locate_operation (chapter: Chapter): ParsedOperation {
    const path = chapter.path
    const method = chapter.method.toLowerCase() as OpenAPIV3.HttpMethods
    const cache_key = path + method
    if (this.cached_operations[cache_key] != null) return this.cached_operations[cache_key]
    const operation = this.spec.paths[path]?.[method]
    if (operation == null) throw new Error(`Operation "${method.toUpperCase()} ${path}" not found in the spec.`)
    this.#deref(operation)
    const parameters = _.keyBy(operation.parameters ?? [], 'name')
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.cached_operations[cache_key] = { ...operation, parameters } as ParsedOperation
    return this.cached_operations[cache_key]
  }

  // Normalize the operation object by dereferencing all $ref properties of an operation object.
  // This includes the parameters, the requestBody, and the responses of the operation.
  // This will result in an operation object with only references to #/components/schemas.
  // We do not dereference $ref's to #components/schemas themselves, due to cyclic references.
  #deref (obj: any): any {
    if (obj == null) return obj
    if (obj.$ref != null) return resolve_ref(obj.$ref as string, this.spec)
    if (Array.isArray(obj)) return obj.map((item) => this.#deref(item))
    if (typeof obj === 'object') for (const key in obj) obj[key] = this.#deref(obj[key])
    return obj
  }
}
