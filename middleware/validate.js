module.exports = (validator) => {
    return (request, response, next) => 
    {
       const result = validator(request.body);
       if(result.error)
       {
        return response.status(500).send(error.details[0].message) //500 return hoga kyu kay validation error
        //aiega 
       }
       next()
      
    }
 }