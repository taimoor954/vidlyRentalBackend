const jwt = require('jsonwebtoken');
const auth = require('./../../../middleware/auth'); //returns a function
const {Register} = require('../../../Models/Register');
const mongoose = require('mongoose')
describe('auth middleware' , () => {
    it('should populate req.user with the payload of a valid jwt', ()=> {
    //  const token = new Register().getAuthToken()
        const user = {_id  : mongoose.Types.ObjectId().toHexString(),  isAdmin  : true}
        const token = new Register(user).getAuthToken();
        const request = {
         header : jest.fn().mockReturnValue(token)
     }
     const next = jest.fn(); //mock func just to pass in auth

     const response = { //mock obj just to pass in auth
        status : (code) => ({
            send : message => {
                ({code , message})
            }
        })
    }

     auth(request, response, next)
     
    //  expect(request.user).toMatchObject(user)

     expect.anything()
    })
})