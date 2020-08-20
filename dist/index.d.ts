import { DecoderOptions } from 'cbor'
import * as Koa from 'koa'
/**
 * Options to pass to the body parser function
 * @prop {string} limit - size limit for the decoded body, defaults to '2mb'
 * @prop {DecoderOptions} decoderOptions - options to pass to cbor Decoder @see {@link http://hildjj.github.io/node-cbor/Decoder.html}
 * @prop {Function} onError - function to handle any errors that occur during decoding, default handler simply logs error to console.
 */
export declare type CborBodyParserOptions = {
    limit?: string
    decoderOptions: DecoderOptions
    onError: (err: Error, ctx: Koa.ParameterizedContext) => void
}
/**
 * If the request type is 'application/cbor', this middleware will decode the body using
 * getRawBody and store the result in the ctx.request.body
 *
 * @param {CborBodyParserOptions} opts
 * @returns {Koa.Middleware}
 */
export declare const cborBodyParser: (opts?: CborBodyParserOptions) => Koa.Middleware
//# sourceMappingURL=index.d.ts.map
