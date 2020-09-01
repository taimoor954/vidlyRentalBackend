const request  = require('supertest');

let server = require('../../index');

const {Genre} = require("../../Models/genre");
const {Register} = require('../../Models/Register');

describe('/api/Genre' , () => {
  beforeEach( () =>  {
    server = require('../../index');
    const token = "";
  })
  afterEach(async () => {
     await server.close()
      await Genre.remove({})
    
     }) 

  
  
  describe('GET ALL GERNES' , () => {
    it('should return all genres ' , async () => {
    await Genre.collection.insertMany([{name : 'genre1'},
      {name : 'genre2'},
      {name : 'genre3'}]);
   const response =  await  request(server).get('/api/Genre')
   
   expect(response.status).toBe(200)
   expect(response.body.length).toBe(3)
   expect(response.body.some(g => g.name == 'genre1')).toBeTruthy()
   expect(response.body.some(g => g.name == 'genre2')).toBeTruthy()
   expect(response.body.some(g => g.name == 'genre3')).toBeTruthy()
    })

  })

  describe('GET Genre:/id ', () => {
    it('should return 200 when valid is passed' , async () => {
      const genre = new Genre({name  : 'genre1'});
      await genre.save();
      const response  = await request(server).get('/api/Genre/'+genre._id)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('name', genre.name)
  })

  it('should return 404 when invalid is passed' , async () => {
    const response = await request(server).get('/api/Genre/2')
    expect(response.status).toBe(404)  
  
  }, )




  })

  describe('Post genre / ', () => {
    var execute =async () =>  {
     return await request(server)
      .post('/api/Genre')
      .set('x-auth-token', token)

      .send({name : name})
 
    }


    it('should return a 401 if client is not logged in' , async () => {
       token = ""
      const res = await execute(); 
     expect(res.status).toBe(404)
    })

    it('should return 400 when invalid genre is less than 5 charac. or more than 200 char' , async () => {
      token = new Register().getAuthToken();
      const name = new Array(300).join('a');
      const response =  await execute()
      // .send({name  : '1234'}) //for name less than 5 chracters
      
      expect(response.status).toBe(400)

    } )

    it('should save genre in database if valid' , async () => {
       token = new Register().getAuthToken();
       name = "genree1fortest";
      const response =  await execute();
    const genre =  await Genre.find({name : 'genree1fortest'});
      expect(genre).not.toBeNull()

    } )

    it('should return genre if valid' , async () => {
       token = new Register().getAuthToken();
       const name = 'genree1fortest';
      const response =  await execute()
      // post('/api/Genre')
    
      // .set('x-auth-token', token)
    
      // .send({name  : '1234'}) //for name less than 5 chracters
      // .send({name : 'genree1fortest'});
    // const genre =  await Genre.find({name : 'genree1fortest'});

    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('name', 'genree1fortest');

    } )


  })
})