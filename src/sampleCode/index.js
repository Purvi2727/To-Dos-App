state = {
	todos: [
		{
			id: 1001,
			title: "Quarterly Newsletter",
			completed: false,
			todos: [
			{ threadId: 1001, id: 100101, title: "New Guest post on brand blogs", completed: false, todos: [] },
			{ threadId: 1001, id: 100102, title: "New Guest post on brand blogs", completed: false, todos: [] }
		] },
		{
			id: 1002,
			title: "Recruiting blog post",
			completed: false,
			todos: []
		},
		{
			id: 1003,
			title: "Mobile app launch",
			completed: false,
			todos: []
		},
		{
			id: 1004,
			title: "Interview with John",
			completed: false,
			todos: []
		},
		{
			id: 1005,
			title: "Submit updates to mobile screenshots",
			completed: false,
			todos: []
		},
		{
			id: 1006,
			title: "Quarterly goals",
			completed: false,
			todos: [
				{ threadId: 1006, id: 100601, title: "Guest post on brand blogs", completed: false, todos: [] },
				{ threadId: 1006, id: 100602, title: "Mobile app updates", completed: false, todos: [] },
				{
					threadId: 100602,
					id: 10060101,
					title: "Volunteer features",
					completed: false,
					todos: [
					  { threadId: 10060101, id: 1006010101, title: "click 1 New Guest post on brand blogs", completed: false, todos: [] },
					  { threadId: 10060101, id: 1006010102, title: "click 2 New Guest post on brand blogs", completed: false, todos: [] }
				]}
			]
		}
	]
}

var buildStructure = "";
function fnIterate(state){
	for(const key in state)
	{
		if(key == "todos" && state.todos.length != 0)
		{
			buildStructure += "<ul>";
			for(let i=0; i < state.todos.length; i++){				
				let newStr = '<li>'+state.todos[i].title+' <button onClick="fnAdd('+state.todos[i].id+')">Add</button></li>';
				buildStructure += newStr
				fnIterate(state.todos[i]);
			}
			buildStructure += "</ul>";
		}
	}
	document.getElementById("container").innerHTML = buildStructure;
}

fnIterate(state);

function fnAdd(no){
	//alert("fnAdd() "+no);
	fnIterateAdd(state, no);
}

function fnIterateAdd(state, no){	
	
	let newStr = { threadId: no, id: Date.now(), title: "22 New Guest post on brand blogs", completed: false, todos: [] }
	for(const key in state)
	{
		if(key == "todos" && state.todos.length != 0)
		{
			for(let i=0; i < state.todos.length; i++){				
				if(state.todos[i].id == no){					
					state.todos[i].todos.push(newStr);
				}
				fnIterateAdd(state.todos[i], no);
			}
			
		}
	}
	//console.log(state);
	buildStructure = "";
	fnIterate(state);
}

/*
function fnIterate(state){
	debugger;
	for(const key in state)
	{
		if(key == "todos" && state.todos.length != 0)
		{
			console.log(key);
			fnIterate(state[key]);
		}
		else
		{
			fnIterate(state[key]);
		}
	}
}

fnIterate(state);*/