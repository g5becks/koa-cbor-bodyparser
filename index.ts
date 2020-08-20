import { decodeAll, DecoderOptions } from 'cbor'
import Koa from 'koa'
import getRawBody from 'raw-body'
import contentType from 'content-type'

/**
 * Options to pass to the body parser function
 * @prop {string} limit - size limit for the decoded body, defaults to '2mb'
 * @prop {DecoderOptions} decoderOptions - options to pass to cbor Decoder @see {@link http://hildjj.github.io/node-cbor/Decoder.html}
 * @prop {Function} onError - function to handle any errors that occur during decoding, default handler simply logs error to console.
 */
export type CborBodyParserOptions = {
    limit?: string
    decoderOptions: DecoderOptions
    onError: (err: Error, ctx: Koa.ParameterizedContext) => void
}

const defaultOpts: CborBodyParserOptions = {
    limit: '2mb',
    decoderOptions: {},
    onError: (err, _) => console.log(err),
}

/**
 * If the request type is 'application/cbor', this middleware will decode the body using
 * getRawBody and store the result in the ctx.request.body
 *
 * @param {CborBodyParserOptions} opts
 * @returns {Koa.Middleware}
 */
export const cborBodyParser = (opts: CborBodyParserOptions = defaultOpts): Koa.Middleware => {
    return async (ctx, next) => {
        if (ctx.request.type === 'application/cbor') {
            ctx.disableBodyParser = true
            try {
                const body = await getRawBody(ctx.req, {
                    length: ctx.req.headers['content-length'],
                    encoding: contentType.parse(ctx.req).parameters.charset,
                    limit: opts.limit,
                })
                const [decoded] = await decodeAll(body, opts.decoderOptions)
                ctx.request.body = decoded
            } catch (e) {
                // noinspection JSDeepBugsSwappedArgs
                opts.onError(e, ctx)
            }
        }
        await next()
    }
}
