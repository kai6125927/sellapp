import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

//1.创建一个vuex的数据仓库，用来存放所有需要交互的数据
export default new Vuex.Store({
    state: {
        goodslist: [],
    },
    mutations: {
        initGoodsList(state, newArr) {
            state.goodslist = newArr
        },
        changeGoodsNum(state, obj) {
            for (let typeObj of state.goodslist) {
                for (let type of typeObj.foods) {
                    if (type.name == obj.name) {
                        type.num += obj.num
                    }
                }
            }
        },
    },
    getters: {
        getGoods(state) {
            let arr = []
            let name = []
            for (let typeObj of state.goodslist) {
                for (let type of typeObj.foods) {
                    if (type.num > 0) {
                        if (!name.includes(type.name)) {
                            arr.push(type)
                            name.push(type.name)
                        }
                    }
                }
            }
            return arr
        }
    }
})
