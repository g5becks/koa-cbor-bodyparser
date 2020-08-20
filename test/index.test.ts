import Koa from 'koa'
import { cborBodyParser } from '../index'
import request from 'supertest'
import Router from '@koa/router'
import { encodeAsync } from 'cbor'
import { Server } from 'http'

const app = new Koa()
const rt = new Router()
let server: Server
app.use(cborBodyParser())
rt.post('/test', async (ctx) => {
    ctx.body = ctx.request.body
})

beforeAll(() => {
    server = app.listen(3000)
})

afterAll(() => {
    server.close()
})
const TestData = {
    name: 'Gary',
    age: 36,
    personalData: Uint8Array.from([192873498237492749287492]),
}

test('cborBodyParser middleware parses request successfully', async () => {
    const data = await encodeAsync(TestData)
    request.agent(server).post('/test').set('Content-Type', 'application/cbor').send(data).expect(200, TestData)
})
