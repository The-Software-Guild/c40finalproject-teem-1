import {extendObservable} from 'mobx'


class UserStore{
    constructor(){
        extendObservable(this,{
            
            loading: true,
            isLoggedIn: false,
            username: '',
            ingredients:[]
        })
    }
}
export default new UserStore();