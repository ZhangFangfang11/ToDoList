/**
 * Created by Desire on 2017/4/27.
 */
var vm =new Vue({
    el:'#app',
    methods:{
        remove(val){
            this.todos= this.todos.filter(function(item){
                return item !=val
            })
        },
        AddClass(e){
                var query={title:this.tit,isChecked:false};
                this.todos.push(query);
                this.tit='';
        },
        changeTitle(value){
            this.curValue = value;
            console.log(this.curValue);
        },
        reset(){
            console.log(this.curValue);
          this.curValue=''//让当前点击的变成空
        }
    },
    data:{
        curValue:'',//当前数据
        state:'',
        tit:'',
        isChecked:true,

        todos:[
            {title:'学VUE',isChecked:true},
            {title:'学React',isChecked:true},
            {title:'学Angular',isChecked:false}
        ]
    },
    computed:{
        clonetodo(){
          if(this.state=='complete'){//全部 返回所有数据
              return this.todos;
          }
          if(this.state=='finish'){// 完成 返回checked 为TRUE 的数据
             return this.todos.filter(function(item){
                  return item.isChecked
              })
          }
            if(this.state=='unFinish'){// 未完成 返回checked为FALSE的数据
                return this.todos.filter(function(item){
                    return !item.isChecked
                })
            }
        },
        count(){
           return this.todos.filter(function(item){
                return !item.isChecked;// 表示将当前项isChecked为true的都删除掉
            }).length

            }

        },
    // vue 提供的生命周期的方法，钩子函数
    mounted(){
        //页面加载完成后会调用此函数
       this.todos=JSON.parse(localStorage.getItem('todos'))|| [];
    },
    directives:{
      //指令  ，可以用来操作DOM
        autoFocus(ele,bindings){//ele 代表的是input元素
            // alert(100);
            //bindings.value 代表的是curValue==value的结果
            if(bindings.value){
                ele.focus();

            }
        }
    },
    watch:{

        todos:{
            handler(){
                console.log(100);
                //将todos存到本地 localStorage.setItem（key,value） value 会被自动toString

                //localStorage.getItem(key) 得到的是json的格式需要用json.parse()转换成对象
             localStorage.setItem('todos',JSON.stringify(this.todos));
            },
            deep:true//深度监控，只要todos有变化 就会执行此监控
        }
    /*    todos(){
            //watch 方法只能监控一级，默认不监控数组中某个对象的属性的变化

        }*/
    }

});
// hash 值 可以在当前页面上 保证不跳转页面 并且更新url
// 获取hash值   window.location.hash
var listener=function () {
    //当hash值变化时会执行此函数，将当前的hash值赋予给state
    // console.log(window.location.hash);
    vm.state=window.location.hash.slice(1);
};listener();
/*hashchange 小写*/
window.addEventListener('hashchange',listener,false);
