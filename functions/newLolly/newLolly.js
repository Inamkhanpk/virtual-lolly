const { ApolloServer, gql } = require("apollo-server-lambda")

const faunadb = require("faunadb")
const axios = require("axios")

    q = faunadb.query;

var client = new faunadb.Client({
  secret: "fnAEArQaEeACAa4ESXhEPyt274h1pwKAbO50cL0F",
})

const typeDefs = gql`
  type Query {
    
    getAllLollies: [Lolly]!
    getLollyByPath(lollyPath: String!): Lolly
  }
  type Lolly {
    recipientName: String!
    sendersName: String!
    message: String!
    flavorTop: String!
    flavorMid: String!
    flavorBot: String!
    lollyPath: String!
  }
  type Mutation {
    createLolly(
      recipientName: String!
      sendersName: String!
      message: String!
      flavorTop: String!
      flavorMid: String!
      flavorBot: String!
      lollyPath: String!
    ): Lolly
  }
`

const resolvers = {
  Query: {
    getAllLollies: async () => {
      var client = new faunadb.Client({
        secret: "fnAEArQaEeACAa4ESXhEPyt274h1pwKAbO50cL0F",
      })
      var result = await client.query(
        q.Map(
          //q.Paginate(q.Match(q.Index("allLollies"))),
          q.Paginate(q.Documents(q.Collection("Lollies"))),
          q.Lambda(x => q.Get(x))
        )
      )
      console.log(result)
      return result.data.map(d => {
        return {
          recipientName: d.data.recipientName,
          sendersName: d.data.sendersName,
          flavorTop: d.data.flavorTop,
          flavorMid: d.data.flavorMid,
          flavorBot: d.data.flavorBot,
          message: d.data.message,
          lollyPath: d.data.lollyPath,
        }
      })
    },

    getLollyByPath: async (_, args) => {
      try {
        var result = await client.query(
          q.Get(q.Match(q.Index("Lolly_by_path"), args.lollyPath))
        )
        console.log(result)

        return result.data
      } catch (e) {
        return e.toString()
      }
    },
  },


  

  Mutation: {
    createLolly: async (root, args) => {
      const result = await client.query(
        q.Create(q.Collection("Lollies"), {
          data: args,
        })
      )

      axios
        .post("https://api.netlify.com/build_hooks/60150d7d970bcfbbcc4a27f2")
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.error(error)
        })

    
      return result.data
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  
})

const handler = server.createHandler();

module.exports = { handler };