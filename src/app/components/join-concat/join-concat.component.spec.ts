import { JoinConcatComponent } from './join-concat.component';

describe('JoinConcatComponent', () => {
  let component: JoinConcatComponent = new JoinConcatComponent();

  it('call joinNames', () => {
    component.joinNames();
    component.joinedNames = component.names.join();
    expect(component.joinedNames).toEqual('Sarah,Angela,Martha,Cindy,Muriel')
  });

  it('call concatNames', () => {
    component.concatNames();
    component.concatenedNames = component.names.concat('Sandra');
    expect(component.concatenedNames).toEqual(['Sarah', 'Angela', 'Martha', 'Cindy', 'Muriel', 'Sandra'])
  });
});
