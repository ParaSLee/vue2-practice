import Vue from 'vue'

//数据存放
const state = {
	orderList: [],
	params: {}
}
//获取数据
const getters = {
	getOrderList: state => state.orderList
}
//异步操作,actions不允许更改state
const actions = {
	// commit用来调用mutation
	fetchOriderList ({ commit, state }) {
		Vue.http.get('/api/getOrderList', state.params).then((res) => {
			commit('updateOrderList', res.data.list)
			console.log(res.data)
		}, (err) => {

		})
	}
}
//同步操作，mutations允许更改state
const mutations = {
	//第二个参数newOrderList是页面传入进来的内容
	updateOrderList (state, newOrderList) {
		state.orderList = newOrderList;
	},
	updateParams (state, newParams) {
		state.params[newParams.key] = newParams.val;
		// console.log(state)
	}
	/*
	***  ES6 
	updateParams (state, { key, val }) {
		state.params[key] = val;
	}
	*/
}


export default {
	state,
	getters,
	actions,
	mutations
}