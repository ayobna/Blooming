import { ADD_Product, DELETE_Product } from '../actions/types';

const initialState = {
    ProudctList: []
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case ADD_Product:
            let idProduct = action.data.Data.Id_Product
            let index = state.ProudctList.findIndex(item => item.Data.Id_Product === idProduct)

            console.log("###################" + action.data.Amount)
            if (-1 !== index) {
                //    let list = state.ProudctList.filter((item) =>
                // item.Data.Id_Product !==  action.data.Data.Id_Product)
                let list = state.ProudctList
                list[index] = action.data
                return {
                    ...state,
                    ProudctList: [...list]
                };
            }
            //console.log("action"+action.data)
            return {

                ...state,
                ProudctList: [...state.ProudctList, action.data]
            };
            
        case DELETE_Product:
                let list = state.ProudctList.filter((item) =>
                    item.Data.Id_Product !== action.key)
                return {
                    ...state,
                    ProudctList: list
                };
                  

        default:
            return state;
            
    }
}

export default cart;