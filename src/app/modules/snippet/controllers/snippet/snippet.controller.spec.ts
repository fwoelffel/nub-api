import {Test} from '@nestjs/testing';
import {TestingModule} from '@nestjs/testing/testing-module';
import {SnippetController} from './snippet.controller';
import {expect} from 'chai';

describe('SnippetController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [
        SnippetController
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let controller: SnippetController;
  beforeEach(() => {
    controller = module.get(SnippetController);
  });

  it('should exist', () => {
    expect(controller).to.exist;
  });
});
