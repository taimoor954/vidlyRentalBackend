//authorzation testing
const request = require('supertest')
let server = require('../../index');
const {Register} = require("../../Models/Register");
const {Genre} = require("../../Models/genre");
const { response } = require('express');

describe('authorization middleware testing', () => {
    beforeEach( () =>  {
        server = require('../../index');
        // const token = "";
    
    })
    afterEach(async () => {
        await  server.close()
       await Genre.collection.remove({})
         }) 
var execute  =   (token) =>
{
    return  request(server).post('/api/Genre').set('x-auth-token', token).send({name : "genreCheck"})
    console.log(request.header);

}

it('should return 401 if no token is provided' ,async() => {
    
   const token = null;
    const res =  await request(server).post('/api/Genre').set('x-auth-token', token).send({name : 'genre1'})
    expect(res.status).toBe(401);
})
it('should return 200 status when valid id is sent', async () => {
    const token = new Register().getAuthToken();
    const res =    await request(server).post('/api/Genre').set('x-auth-token', token).send({name : 'genre1'})
    expect(res.status).toBe(200)
})

it('should return 400 status when valid id is sent', async () => {
    const token = 'a';
    const res =    await request(server).post('/api/Genre').set('x-auth-token', token).send({name : 'genre1'})
    expect(res.status).toBe(400)
})

})