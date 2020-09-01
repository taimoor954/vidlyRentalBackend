describe('/api/genres', () => {
    beforeEach(() => {
     
      });
    afterEach( () => {
      server = require('../../index');
      console.log(server, 'server after each'); 

      server.close()

    })
    describe('GET', ()=> {
      it('should return all genres' , async () => {
       await Genre.collection.insertMany([{name : 'genre1'},
        {name : 'genre2'},
        {name : 'genre3'}
        ])
        const res= await request(server).get('/api/Genre')
        expect(res.status).toBe(200)
        expect(res.body.length).toBe(3)
        expect(res.body.some(g => g.name == 'genre1')).toBeTruthy()
        expect(res.body.some(g => g.name == 'genre2')).toBeTruthy()
        expect(res.body.some(g => g.name == 'genre3')).toBeTruthy()
      
      });
  })
});
   

// require('winston-mongodb'); //dont care what is exported. use it to log err message in mongodb 
// const winston = require('winston'); //use to log errors returns objectr
//winston handle all errors in middleware. startup may koi error ata hai tou wo ye handle nahi karay ga

// const db = config.get('db');


 beforeEach(() =>
     {
      
      console.log(process.env.VIDLY_SERVER
        , "RETURN A SERVER");
    
    }
    )
    afterEach(async () => {
      process.env.VIDLY_SERVER.close();
        await Genre.remove({});
      })
      
    describe('GET', ()=> {
        it('should return all genres' , async () => {
         await Genre.collection.insertMany([{name : 'genre1'},
          {name : 'genre2'},
          {name : 'genre3'}
          ])
          const res= await request(server).get('/api/Genre')
          expect(res.status).toBe(200)
          expect(res.body.length).toBe(3)
          expect(res.body.some(g => g.name == 'genre1')).toBeTruthy()
          expect(res.body.some(g => g.name == 'genre2')).toBeTruthy()
          expect(res.body.some(g => g.name == 'genre3')).toBeTruthy()
        
        });


    });
    
    // describe('GET GENRES WITH ID GENRE/:ID', () => {
    //   it('should return a genre if valid id is passed' , async () => {
    //     const genre = new Genre({name : "GENRE_NAME"})
    //     await genre.save()
    //   const res = await request(server).get('/api/Genre/'+genre._id)
    //     expect(res.status).toBe(200)
    //     expect(res.body).toHaveProperty('name', genre.name)
    //     })

    //   it('should return a invalid message 404 if valid id is not passed' , async () => {
      
    //   const res = await request(server).get('/api/Genre/'+4)
    //     expect(res.status).toBe(404)
    //     // expect(res.body).toHaveProperty('name', genre.name)

    //     })
    // })
    // describe('POST /', () => {
    //   it('should return a 404 is client is not logged in' , async () => {
    //   const response =  await request(server).post('/api/Genre').send({name  : 'genre1'})
    //   expect(response.status).toBe(404)  
    // })
    // it('should return a 400 if  genre is less than 5 characters' , async () => {
    //   const register = new Register().getAuthToken();

    //   const response =  await request(server).post('/api/Genre')
    //   .set('x-auth-token')
    //   .send({name  : '123'})
    //   expect(response.status).toBe(400)  
    // })
   --coverage in pack.json script > tests