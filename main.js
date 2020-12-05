const letters = "BINGO".split("")

function select_oninput(letter){
	let col = letters.indexOf(letter);
	let first_val = 1 + col*15;
	let numbers = [];
	for (let i=0; i<15; i++){
		numbers.push(first_val+i);
	}
	for (let i=0; i<5; i++){
		if (letter=='N' && i==2){
			continue;
		}
		let cell = document.getElementById(`${letter}${i+1}`).value;
		let index = numbers.indexOf(parseInt(cell));
		if (index > -1){
			numbers.splice(index, 1);
		}
	}
	for (let i=0; i<5; i++){
		if (letter=='N' && i==2){
			continue;
		}
		let options = document.getElementById(`${letter}${i+1}`);
		let val = options.value;
		options.options.length = 0;
		let val_opt = document.createElement("option");
		val_opt.text = val;
		options.options.add(val_opt);
		for (let j=0; j<numbers.length; j++){
			let opt = document.createElement("option");
			opt.text = numbers[j];
			options.options.add(opt);
		}
		options.value = val
	}
}

function random_onclick(){
	document.getElementById('code').innerHTML = "";
	let card = [[],[],[],[],[]];
	for (let i=0; i<5; i++){
		let col = [];
		for (let j=0; j<15; j++){
			col.push(j+15*i+1);
		}
		for (let j=0; j<15; j++){
			let index = Math.floor(Math.random()*col.length);
			card[i].push(col[index]);
			col.splice(index, 1);
		}

	}
	let table_body = document.getElementById('table_body');
	for (let row=0; row<5; row++){
		for (let cell=0; cell<5; cell++){
			if (row==2 && cell==2){
				continue;
			} else {
				table_body.rows[row].cells[cell].getElementsByTagName("select")[0].value = "";
			}
		}
	}	
	select_oninput("B");
	select_oninput("I");
	select_oninput("N");
	select_oninput("G");
	select_oninput("O");
	for (let row=0; row<5; row++){
		for (let cell=0; cell<5; cell++){
			if (row==2 && cell==2){
				continue;
			} else {
				table_body.rows[row].cells[cell].getElementsByTagName("select")[0].value = card[cell][row];
			}
		}
	}
	select_oninput("B");
	select_oninput("I");
	select_oninput("N");
	select_oninput("G");
	select_oninput("O");
}

function encode(){
	let code = "";
	let table_body = document.getElementById('table_body');
	for (let row=0; row<5; row++){
		for (let cell=0; cell<5; cell++){
			if (row==2 && cell==2){
				code += '-';
			} else {
				let val = (parseInt(table_body.rows[row].cells[cell].getElementsByTagName("select")[0].value)-1)%15+1;
				if (isNaN(val)){
					return;
				}
				code += (val).toString(16)
			}
		}
	}
	return code;
}

function gen_onclick(){
	let code = encode()
	if (code != undefined)
		document.getElementById('code').innerHTML = encode();
	else
		document.getElementById('code').innerHTML = "Error: Card must be filled";
}

select_oninput("B");
select_oninput("I");
select_oninput("N");
select_oninput("G");
select_oninput("O");