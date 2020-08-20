'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.cborBodyParser = void 0
var tslib_1 = require('tslib')
var cbor_1 = require('cbor')
var raw_body_1 = tslib_1.__importDefault(require('raw-body'))
var content_type_1 = tslib_1.__importDefault(require('content-type'))
var defaultOpts = {
    limit: '2mb',
    decoderOptions: {},
    onError: function (err, _) {
        return console.log(err)
    },
}
/**
 * If the request type is 'application/cbor', this middleware will decode the body using
 * getRawBody and store the result in the ctx.request.body
 *
 * @param {CborBodyParserOptions} opts
 * @returns {Koa.Middleware}
 */
exports.cborBodyParser = function (opts) {
    // noinspection JSDeepBugsBinOperand
    if (opts === void 0) {
        opts = defaultOpts
    }
    return function (ctx, next) {
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var body, decoded, e_1
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(ctx.request.type === 'application/cbor')) return [3 /*break*/, 5]
                        ctx.disableBodyParser = true
                        _a.label = 1
                    case 1:
                        _a.trys.push([1, 4, , 5])
                        return [
                            4 /*yield*/,
                            raw_body_1.default(ctx.req, {
                                length: ctx.req.headers['content-length'],
                                encoding: content_type_1.default.parse(ctx.req).parameters.charset,
                                limit: opts.limit,
                            }),
                        ]
                    case 2:
                        body = _a.sent()
                        return [4 /*yield*/, cbor_1.decodeAll(body, opts.decoderOptions)]
                    case 3:
                        decoded = _a.sent()[0]
                        ctx.request.body = decoded
                        return [3 /*break*/, 5]
                    case 4:
                        e_1 = _a.sent()
                        // noinspection JSDeepBugsSwappedArgs
                        opts.onError(e_1, ctx)
                        return [3 /*break*/, 5]
                    case 5:
                        return [4 /*yield*/, next()]
                    case 6:
                        _a.sent()
                        return [2 /*return*/]
                }
            })
        })
    }
}
