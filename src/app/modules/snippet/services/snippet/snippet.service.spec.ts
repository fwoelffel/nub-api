import {Test} from '@nestjs/testing';
import {TestingModule} from '@nestjs/testing/testing-module';
import {SnippetService} from './snippet.service';
import {expect} from 'chai';

describe('SnippetService', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      components: [
        SnippetService
      ]
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let service: SnippetService;
  beforeEach(() => {
    service = module.get(SnippetService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });
});
