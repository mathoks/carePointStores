



const databaseAdapter = (p) => {

  const   createSession =  (data) => p.session.create({ data })

  return {
    createSession
  }
}

export default databaseAdapter
