import { GroupButtonsComponent } from './group-buttons.component';

describe('GroupButtonsComponent', () => {
  it('GroupButtonsComponent', () => {
    const component: GroupButtonsComponent = new GroupButtonsComponent,
        spy: any = spyOn(component.getActiveButton, 'emit'),
        mock: any = { text: 'Button 3', value: 'button3' };
    spy(mock);
    component.setActiveButton(1);
    expect(component.activeBtn).toBe(1);
    expect(spy).toHaveBeenCalledWith(mock);
  });
});
