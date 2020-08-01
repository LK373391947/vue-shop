import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		cart:[],
		total:0
	},
	actions:{
		
	},
	mutations:{
		//添加
		addToCart(state,obj){
			let len=state.cart.length;
			let bool=false;
			for(let i=0;i<len;i++){
				if(state.cart[i].name==obj.name)
				{state.cart[i].num++;
				state.cart[i].price=Number(obj.price);
				state.total+=Number(obj.price);				
				 bool=true;
				 break;}
			}
			if(!bool){state.cart.push({name:obj.name,num:1,price:Number(obj.price)});state.total+=Number(obj.price);}
		},
		//减少
		subToCart(state,obj){
			let len=state.cart.length;
			for(let i=0;i<len;i++){
				if(state.cart[i].name==obj.name)
				{
					if(state.cart[i].num>1){state.cart[i].num--;state.total-=Number(obj.price);break;}
					else {state.cart.splice(i,1);state.total-=Number(obj.price);break;}
					}
			}
			
		},
		//删除
		deleteItem(state,obj){
			let len=state.cart.length;
			for(let i =0;i<len;i++){
				if(state.cart[i].name==obj.name){
					state.total-=state.cart[i].num*state.cart[i].price;
					state.cart.splice(i,1);
					
				}
			}
		},
		//清空
		deleteAll(state){
			let len=state.cart.length;
			state.cart.splice(0,len);
			state.total=0;
		}
	}
		
	
});
export default store;
/*
*vuex基本的使用方法
*
*
*
*
*
*
*
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        count:0//在组件中使用this.$store.state.count调用  或者通过mapState进行调用
    },
    mutations:{
        addcount(state){state.count++}//在组件中使用this.$store.commit('addcount')调用  或者调用mapMutation进行调用
    },
    actions:{
        //异步任务
        addcountAsync(context){
            setTimeout(() => {
                //调用mutations中的同步任务
                context.commit('addcount')
            }, 1000);
        }//在组件中使用this.$store.dispatch('addcountAsync')调用
    },
    getters:{
        //封装的数据用来获得state中的数据，而不进行修改，用ths.$store.getter.show()来调用  或者用mapGetters调用
        show(state){
            return state.count;
        }
    }

})
*/