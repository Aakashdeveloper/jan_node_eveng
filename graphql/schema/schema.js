const graphql = require('graphql');
const axios = require('axios');

const{
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLSchema
} = graphql;

const MovieType = new GraphQLObjectType({
    name:'Movies',
    fields:{
        id:{type:GraphQLInt},
        name:{type:GraphQLString},
        language:{type:GraphQLString},
        rate:{type:GraphQLFloat},
        type:{type:GraphQLString},
        imageUrl:{type:GraphQLString}
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        Movies:{
            type:MovieType,
            args:{id:{type:GraphQLInt}},
            resolve(parentValue,args){
                return axios.get(`http://localhost:8900/movies/${args.id}`)
                .then((res)=> res.data)
            }
        }
    }
})

module.exports= new GraphQLSchema({
    query:RootQuery
})

/*
{
  Movies(id:2){
    language,
    rate
  }
}

*/