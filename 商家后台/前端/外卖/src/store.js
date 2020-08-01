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