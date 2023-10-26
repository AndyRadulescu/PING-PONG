import { makeId } from '@/app/shared/utils';

describe("utils",()=>{
  it('should make random id with 4 chars',()=>{
    const randomizedStringId = makeId(4);
    expect(typeof randomizedStringId).toEqual('string');
    expect(randomizedStringId.length).toEqual(4);
  })
})
