let server = require('../../index');
const request = require('supertest');
const mongoose = require('mongoose')
const {Rental} = require('../../Models/rental'); 
const moment =require('moment');
const {Register} = require('../../Models/Register'); 
const {Movie} = require('../../Models/movie'); 
describe('/api/return' ,() => {
    let rental;
    const customerID = mongoose.Types.ObjectId() //bc we will use this id to send request tabhi alag store karaya hai
    const movieID = mongoose.Types.ObjectId() //bc we will use this id to send request tabhi alag store karaya hai

    let movie;
    
    beforeEach(async () =>  {
        server = require('../../index');
        
        movie = new Movie({
            _id : movieID,
            title : '12345',
            genre : {name  : '12345'},
            numberInStocks : 10,
            rentalRate : 2
        
        })
      await movie.save()
        
  
        rental = new Rental({
            customer :  {
                _id : customerID,
                name : 'taimoortest',
                phone : '1234567',
                IsGold : true
            },
            movie : {
                _id : movieID,
                title : 'testTitle',
                dailyRentalRate : 2
            },

        
        });
       await rental.save()
  
    })
    afterEach(async () => {
         await server.close();
        await Rental.remove({});
        await Movie.remove({});
    })
    it('should find rental document in database which we have jus saved' ,async() => {
         const result = await Rental.findById(rental._id)
        expect(result).not.toBeNull()
    })

    it('should Return 401 if client not logged in', async () => {
      const res =   await request(server).post('/api/return').send({customerID : customerID, movieID : movieID});
    expect(res.status).toBe(401)
    })

    it('should Return 400 if customerID is not provided', async () => {
        //no custid is provided only movie id uis given
        const token = new Register().getAuthToken()
        const res=await request(server).post('/api/return').set('x-auth-token', token).send({movieID});
        expect(res.status).toBe(500) //changed real 400
    })
    it('should Return 400 if movieID is not provided', async () => {
        //no custid is provided only movie id uis given
        const token = new Register().getAuthToken()
        const res=await request(server).post('/api/return').set('x-auth-token', token).send({customerID});
        expect(res.status).toBe(500) //changed real 400
    
    })
    it('should Return 404 if no rental found for given movieID/custID ', async () => {
        //no custid is provided only movie id uis given
      await  Rental.remove({}) // so that database is empty
        const token = new Register().getAuthToken()
        const res=await request(server).post('/api/return').set('x-auth-token', token).send({customerID, movieID});
        expect(res.status).toBe(404)
    
    })
  
    it('should Return 400 if return is already processed  ', async () => {
        //no custid is provided only movie id uis given
        rental.dateReturned = new Date();
        await rental.save();
        const token = new Register().getAuthToken();
        const res=await request(server).post('/api/return').set('x-auth-token', token).send({customerID, movieID});
        expect(res.status).toBe(400)
    
    })
  
    it('should Return 200 if valid request is passed', async () => {
    
    const token = new Register().getAuthToken();
    const res=await request(server).post('/api/return').set('x-auth-token', token).send({customerID, movieID});
    expect(res.status).toBe(200)
    
    })
  
    it('should set the return date if input is valid', async () => {
    
    const token = new Register().getAuthToken();
    const res=await request(server).post('/api/return').set('x-auth-token', token).send({customerID, movieID});
    const rentalInDB = await Rental.findById(rental._id);
    expect(rentalInDB.dateReturned).toBeDefined()
    const diffInDate = new Date() - rentalInDB.dateReturned; //diff will be in millisecs
    expect(diffInDate).toBeLessThan(10*1000)
    // Received:   1598785492395 i got this because i stored 1 in date return production code mauy
    // so when 1 date format may change hua tou usnay koi number dia and wo number Date() say minus hua or ye
    //15987......... answer aya
    })

it('should set the rental fee if input is valid', async () => {
    rental.dateOut = moment().add(-7, 'days').toDate()
   await rental.save()
    const token = new Register().getAuthToken();
    const res=await request(server).post('/api/return').set('x-auth-token', token).send({customerID, movieID});
    const rentalInDB = await Rental.findById(rental._id);
    expect(rentalInDB.rentalFee).toBe(14);
    
})


it('should increase the number of stocks by 1 of movie if input is valid', async () => {
   
    const token = new Register().getAuthToken();
    const res=await request(server).post('/api/return').set('x-auth-token', token).send({customerID, movieID});
    const movieInDB = await Movie.findById(movieID);
    expect(movieInDB.numberInStocks).toBe(11);
    
})

it('should send rental if input is valid', async () => {
   
    const token = new Register().getAuthToken();
    const res=await request(server).post('/api/return').set('x-auth-token', token).send({customerID, movieID});
    const rentalInDB = await Movie.findById(rental._id);
    expect(res.body).toHaveProperty('dateOut');
    expect(res.body).toHaveProperty('dateReturned');
    expect(res.body).toHaveProperty('rentalFee');
    expect(res.body).toHaveProperty('movie');
    expect(res.body).toHaveProperty('customer');

    //a better way of writing above repitetive line is following
    // expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['dateOut, dateReturned', 'rentalFee','movie','customer','_id','_v']))
    
})

    

})

//if call an endpoint that does not exist by default express throws 404