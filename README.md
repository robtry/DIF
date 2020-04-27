# DIF Naucalpan

Frontend Side.

## ToDo

- [ ] min/max lenght for users for pass
- [ ] requiried all for props in format card
- [ ] add is required in forms 
- [ ] pags if one do no show pagination

## Routes para el API

```txt
- / = get {
	Ingreso de NNAs del último mes.
	Exegreso de NNAs del último mes.
	Formatos Editados por tipo.
	Formatos Creados por tipo.
	Hisotorial del día de los movimientos.
}

- / = post => {
	username
	password
}

- /usuarios/all/ = get => {
	todos los usuarios
}

- /usuarios/admin/ = get => {
	solo los admin users
}

- /usuarios/medico/ = get => {
	solo los medico users
}

- /usuarios/abogado/ = get => {
	solo los abogado users
}

- /usuarios/tsocial/ = get => {
	solo los tsocial users
}

- /usuarios/psicologo/ = get => {
	solo los admin users
}

- /usuarios/:id/ = get => {
	Nombre y tipo del user
}

- /usuarios/ = post => {
	nombre
	tipo
}

```