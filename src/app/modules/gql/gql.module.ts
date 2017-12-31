import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {GraphQLFactory, GraphQLModule} from '@nestjs/graphql';
import {SnippetResolvers} from "./snippet/snippet.resolvers";
import {SnippetModule} from "../snippet/snippet.module";
import * as bodyParser from 'body-parser';

@Module({
  imports: [
    GraphQLModule,
    SnippetModule
  ],
  components: [
    SnippetResolvers
  ]
})
export class GQLModule implements NestModule {

  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewaresConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });
    consumer
      .apply(bodyParser.text({ type: 'application/graphql' }))
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL })
      .apply((req, res, next) => {
        if (req.is('application/graphql')) {
          req.body = { query: req.body };
        }
        next();
      })
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL })
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
      .forRoutes({ path: '/graphiql', method: RequestMethod.GET })
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }

}