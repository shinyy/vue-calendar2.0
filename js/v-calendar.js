window.onload=function(){
	var cal=new Vue({
		el:".v-calendar",
		data:{
			d:new Date(),
			m:[new Date().getMonth()+1],
			y:[new Date().getFullYear()],
			day:[],
			dCount:[],
			calNum:5,
			//交互日期
			dCur:new Date().getDate(),
			mCur:new Date().getMonth()+1,
			yCur:new Date().getFullYear(),
			dCur2:new Date().getDate()+1,
			mCur2:new Date().getMonth()+1,
			yCur2:new Date().getFullYear(),
			id1:"",
			id2:"",
			//真实日期
			dTrue:new Date().getDate(),
			mTrue:new Date().getMonth()+1,
			yTrue:new Date().getFullYear(),
			
			clickNum:0,
		},
		methods:{
			//加载完成的默认离店位置
			leaveD:function(){
					if(this.dCur==new Date(this.y,this.m,0).getDate()&&this.mCur!=12){
						this.dCur2=1;
						this.mCur2=new Date().getMonth()+2;
					}else if(this.dCur==new Date(this.y,this.m,0).getDate()&&this.mCur==12){
//						console.log("huan")
						this.dCur2=1;
						this.mCur2=1;
						this.yCur2=this.yCur+1;
					}
			},
			//依次下月变量
			nextCal:function(n){
				let setY=new Date().getFullYear(),
					setM=new Date().getMonth()+1+n;
				//判断月分数以获取正确年月
				if(setM>12){
					setY+=parseInt((setM-1)/12);
					setM%12==0?setM=12:setM=setM%12;
				};
				this.y.push(setY);
				this.m.push(setM);
				
			},
			//渲染日历
			calendar:function(y,m){
					//每月天数
					if(y%4==0){
						this.dCount=[31,29,31,30,31,30,31,31,30,31,30,31]
					}else{
						this.dCount=[31,28,31,30,31,30,31,31,30,31,30,31]
					};
					//每月首天 渲染空格
					this.day.push(new Date(y,m-1).getDay());
			},
			//封装好点击所需函数
			inDate:function(n){
					this.dCur=new Date(n).getDate();
					this.mCur=new Date(n).getMonth()+1;
					this.yCur=new Date(n).getFullYear();
					this.mCur2="";
					this.clickNum=1;
					console.log("入住"+n);
			},
			leaveDate:function(n){
					this.dCur2=new Date(n).getDate();
					this.mCur2=new Date(n).getMonth()+1;
					this.yCur2=new Date(n).getFullYear();
					this.clickNum=0;
					console.log("离店"+n)
			},
			//点击日历
			calTab:function(e){
				
				
				if(Date.parse(new Date(e.currentTarget.dataset.d))>=Date.parse(new Date(this.yTrue+"/"+this.mTrue+"/"+this.dTrue))&&this.clickNum==0){
					this.id1=e.currentTarget.dataset.d;
					this.inDate(this.id1);
				}else if(this.clickNum==1){
					this.id2=e.currentTarget.dataset.d;
					if(Date.parse(this.id2)>Date.parse(this.id1)){
						this.leaveDate(this.id2);
					}else if(Date.parse(this.id2)<=Date.parse(this.id1)&&Date.parse(this.id2)>Date.parse(new Date(this.yTrue+"/"+this.mTrue+"/"+this.dTrue))){
						this.id1=e.currentTarget.dataset.d;
						this.inDate(this.id1);
					}
				}
				
				
				
				
			}
		},
		mounted(){
				//先渲染一个月，后面依次循环
				this.leaveD();
				
				this.calendar(this.y[0],this.m[0]);

				for(let i=1;i<this.calNum;i++){
					this.nextCal(i);
					this.calendar(this.y[i],this.m[i]);
				};
		},
	})
}
