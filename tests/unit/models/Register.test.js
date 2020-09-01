// const { describe } = require("joi");

const {Register, myPrivateKey} = require('../../../Models/Register');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('register.getAuthToken', ()  =>  {
    afterEach(() => {
        delete global.__mobxInstanceCount; // prevent warnings
      })
      it('should validate user token and test it' ,  (done) => {
        try{
            const payload = {
                _id :new mongoose.Types.ObjectId().toHexString(),
                isAdmin  : true 
        };
    
            const register = new Register(payload);
            
            const token = register.getAuthToken();
          const decoded =  jwt.verify(token, myPrivateKey)
        expect(decoded).toMatchObject(payload)
        done()
    
        }
        catch(e) 
        {
            done(e)
        }
})
})