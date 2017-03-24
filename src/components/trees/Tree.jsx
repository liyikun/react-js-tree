import React, { Component } from 'react';
import './tree.css'
import _ from 'lodash';

class Tree extends Component {

  constructor(props){
    super(props)

    this.state = {
        run:false,
        name:"",
        itemId:10,
        select:null,
        items: [
               {
                   id:"1",
                   name:"root1",
                   show: true,
                   child:[
                       {
                            id: "2",
                            name:"bb",
                            show:false,
                            child:[

                            ]
                        }      
                   ]
               },
                {
                   id:"3", 
                   name:"root2",
                   show:false,
                   child:[
                       {
                           id:"4", 
                            name:"dd",
                            show:false,
                            child:[

                            ]
                        }      
                   ]
               },
                {
                   id:"5", 
                   name:"root3",
                   show:false,
                   child:[
                       {
                           id:"6", 
                            name:"ee",
                            show:false,
                            child:[

                            ]
                        }      
                   ]
               },
           ]
    } //初始化状态

  }

  addNode(path,item,newnode){
    item.child.push(newnode)
    this.findState(newnode.id)
  }//添加子节点

  deleteNode(item,index,array){
      if(array.length>0){
        array.splice(index,1)
      }  
  } //删除Item

  openPaths(path,node){
    const target = document.getElementById(node.id)

    if(path.length>0){
        path.forEach((item)=>{
            item.show = true;
        })
    }  
  } //打开路径

  checkNode(node){
      node.show = !node.show; 
  } //切换ITEM展现方法

  findName(name){
    this.setState({
        items: this.traverseDF(this.state.items,"name",name,[],(path,node)=>this.openPaths(path,node))    
    })  
  } //搜索Name

  findState(id){   
     this.setState({
         items: this.traverseDF(this.state.items,"id",id,[],(path,node)=>this.openPaths(path,node))
     }) 
  } //搜索节点

  closeItem(id){
      this.setState({
        items: this.traverseDF(this.state.items,"id",id,[],(path,node)=>this.checkNode(node))   
      })
  } //切换ITEM展现

  deleteItem(id){ 
    let ids = id.replace("item","")
    this.setState({
        items: this.traverseDF(this.state.items,"id",ids,[],(path,item,index,array)=>this.deleteNode(item,index,array))   
      })
  } //删除节点

  addItem(id,node){
    let newnode = {
        id:`${this.state.itemId}`, 
        ...node,
        show:false,
        child:[]
    }  
    let ids = id.replace("item","")
    this.setState({
        itemId: this.state.itemId+1,
        items: this.traverseDF(this.state.items,"id",ids,[],(path,item,index,array)=>this.addNode(path,item,newnode))   
      })

  }//添加子节点

  traverseDF(list,key,value,path,callback){
  
    if(list){
        list.forEach((item,index,array) => {
            if(key == "name"){
                 if (value.length>0&&item["name"].indexOf(value)>=0){
                    callback(path,item,index,array)       
                }
            }else{
                 if(item[key] === value){
                 callback(path,item,index,array)
                 return list
                } 
            }
            
            path.push(item)    
            this.traverseDF(item.child,key,value,path,callback);
            path.pop()           
        })
        return list    
    }   
  }//递归搜索

  onItemClick(e,items){
    const id = items.id;
    this.closeItem(id)
  }//点击收缩

  onCheckItem(e,id){
      const target = document.getElementById(id) 
    if(this.state.select) {
        const old = document.getElementById(this.state.select);
        if(old) old.setAttribute("style",""); 
        this.setState({
            select:id
        })         
        target.setAttribute("style","background:blue");   
    }else{
        this.setState({
            select:id
        })
        target.setAttribute("style","background:blue"); 
    }                   
  }

  renderItems(items,...styles){

      if(!items) return;

      let dom = []

      if (items instanceof Array) {
            let list = [];
            let show = true;
            for (let item of items) {
                list.push(this.renderItems(item));
            }
            if(styles.length>0){
                show = styles[0]       
            }
            dom.push(
                <ul key="uls" style = {show?{display:"block"}:{display:"none"}} >
                    {list}
                </ul>
            );
        } else {
            dom.push(
                 <li key = {items.id}>
                    <div className = "item" id = {"item"+items.id} onClick = {(e)=>this.onCheckItem(e,"item"+items.id)}>
                        <div className = "left" onClick = {(e)=>this.onItemClick(e,items)}>
                            {items.show?"-":"+"}
                        </div>
                        <div className = "right" >{items.name}</div>
                    </div>
                    {this.renderItems(items.child,items.show)}
                 </li>   
            );
        }

        return dom;
  } //递归渲染


  render() {
    return (
      <div>
          <input type = "text" placeholder="搜索" onChange = {(e)=>{
              this.findName(e.target.value)
              this.setState({name:e.target.value})
          }}></input>
          <button onClick = {()=> this.addItem(this.state.select,
              {
                   name:this.state.name.length==0?"normal":this.state.name,
              }
            )}>添加</button>
          <button onClick = {()=> this.deleteItem(this.state.select)}>删除</button>
          <p>trees</p>
          <div id = "lists">
            {this.renderItems(this.state.items)}
          </div>  
      </div>
    );
  }
}

Tree.defaultProps = {

}

export default Tree;
