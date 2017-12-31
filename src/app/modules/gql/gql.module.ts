import {Module, NestModule, MiddlewaresConsumer, RequestMethod} from '@nestjs/common';
import {graphqlExpress} from 'apollo-server-express';
import {GraphQLFactory, GraphQLModule} from '@nestjs/graphql';
import {SnippetResolvers} from "./snippet/snippet.resolvers";
import {SnippetModule} from "../snippet/snippet.module";

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
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }

}