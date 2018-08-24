import {observable,action} from 'mobx';
class Store {
    @observable bgColor = 0;
    @action changeBgColor(num){
        this.bgColor = num;
    }
}
let store = new Store();
export default store;