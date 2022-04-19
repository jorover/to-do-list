const todoVal = document.querySelector('.to-do');
const todoForm = document.querySelector('.to-do-list-form');
const todoList = document.querySelector('.to-do-list');
let edited = localStorage.getItem('Edited');
const todoListContainer = document.querySelector('.to-do-list-container');
const errorMsg = document.querySelector('.error-msg');
let todoArr = [];
let id = 1;



todoVal.addEventListener('keyup', ()=> {
	todoListContainer.classList.remove('active-error');
})



todoForm.addEventListener('submit', (e) => {
	e.preventDefault();

	if(todoVal.value === ''){
		todoListContainer.classList.add('active-error');
	}


	if(edited === null && todoVal.value.length >= 1){
		displayValue(todoVal.value);
		todoVal.value = '';
	}

	if(edited) {
		editContent(edited, todoVal.value);
		localStorage.removeItem('Edited');
		todoVal.value = '';
		location.reload();
	}

})


const displayValue = (todo) => {
	todoList.innerHTML = ``;
	const newItemList = {id: id++, todo: todo};
	todoArr.push(newItemList);
	const newItem = todoArr.map(item => {
		let {id, todo} = item;
		return todoList.innerHTML +=`<article class="to-do-items">
		<article class="todo-text">
			<p class="todo-inner-text"> ${todo} </p>
		</article>
		<figure class="todo-icons">
			<img src="./logos/edit.png" 
			alt="edit" 
			data-val=${todo}
			class="edit-btn"
			onClick="editList(this)" />
			<img src="./logos/delete.png" 
			alt="delete" 
			data-val=${id++} 
			class="delete-btn" 
			onClick="removeItems(this)" />
		</figure>
		</article>`
	})

	return newItem, localStorage.setItem('All Todo', JSON.stringify(todoArr));
}


const removeItems = (item) => {
		todoArr = todoArr.filter(eachItem => {
			let {id, todo} = eachItem;
			if(id !== parseFloat(item.dataset.val)){
				return eachItem;
			}
		})

		const removed = item.parentElement.parentElement.remove();

		return todoArr, removed, localStorage.setItem('All Todo', JSON.stringify(todoArr));
}


const editList = (item) => {
	todoVal.value = item.dataset.val;
	todoVal.focus();
	location.reload();
	return todoVal.value, localStorage.setItem('Edited', JSON.stringify(item.dataset.val));
}


const editContent = (edited, val) => {
	const arr = todoArr.map(item => {
		const newItem = {
			id: item.id,
			todo: item.todo === JSON.parse(edited) ? val:item.todo
		}

		return newItem;
	})

	todoList.innerHTML = ``;
	const newArry = arr.map(item => {
		let {id, todo} = item;
		return todoList.innerHTML +=`<article class="to-do-items">
		<article class="todo-text">
			<p class="todo-inner-text"> ${todo} </p>
		</article>
		<figure class="todo-icons">
			<img src="./logos/edit.png" 
			alt="edit" 
			data-val=${todo}
			class="edit-btn"
			onClick="editList(this)" />
			<img src="./logos/delete.png" 
			alt="delete" 
			data-val=${id} 
			class="delete-btn" 
			onClick="removeItems(this)" />
		</figure>
		</article>`
	})

	return newArry, localStorage.setItem('All Todo', JSON.stringify(arr));

	
}



const displayStored = () => {
	let items = JSON.parse(localStorage.getItem('All Todo'));
	if(items === null){
		console.log('Waiting')
	} else {
		items.forEach(item => {
			let {id, todo} = item;
			displayValue(todo);
		})
	}

	todoVal.value = JSON.parse(localStorage.getItem('Edited'))
}

displayStored();












