"use strict"

function AmmoType(name)
{
	this.type = "Ammo"
	this.name = name
	this.amount = 0
}

function Gun(name, ammoType, magSize)
{
	this.type = "Gun"
	this.name = name
	this.ammoType = ammoType
	this.magSize = magSize
	this.ammoInMag = 0
}

function addAmmoType() {
	const ammoTypeInput = document.getElementById("ammoTypeInput").value
	const ammoType = new AmmoType(ammoTypeInput)
	localStorage.setItem(ammoTypeInput, JSON.stringify(ammoType))

	render()
}

function doesAmmoTypeExist(ammoName){
    const ammoType = JSON.parse(localStorage.getItem(ammoName))
    
    if (ammoType != null && ammoType.type != null && ammoType.type == "Ammo")
        return true
    return false
}

function gunsDependOn(ammoName){
    const ammoType = JSON.parse(localStorage.getItem(ammoName))
    if(ammoType.type != "Ammo") return false
    const keys = Object.keys(localStorage)

	for (const i in keys){
	    const key = keys[i]
	    const item = JSON.parse(localStorage.getItem(key))
        if (item.type == "Gun" && item.ammoType == ammoName)
            return true
    }
    return false
}


function addGun(){
	const gunNameInput = document.getElementById("gunNameInput").value
	const gunAmmoTypeInput = document.getElementById("gunAmmoTypeInput").value
	const maxAmmoInput = document.getElementById("maxAmmoInput").value

    if(!doesAmmoTypeExist(gunAmmoTypeInput))
    {
        window.alert("Ammo type doesn't exist. Make sure it matches an existing one!")
        return
    }

	let gun = new Gun(gunNameInput, gunAmmoTypeInput, maxAmmoInput)
	localStorage.setItem(gun.name, JSON.stringify(gun))

	render()
}

function shootGun(gunName){
	let gun = JSON.parse(localStorage.getItem(gunName))

	if (gun.ammoInMag < 1)
	{
		window.alert("Mag is empty! Couldn't shoot!")
		return
	}

	--gun.ammoInMag

	localStorage.setItem(gun.name, JSON.stringify(gun))
	render()
}

function reloadGun(gunName){
	let gun = JSON.parse(localStorage.getItem(gunName))
	let ammo = JSON.parse(localStorage.getItem(gun.ammoType))
	if(ammo.amount == 0)
	{
		window.alert("No ammo left! Wasn't able to reload!")
		return
	}

	const ammoMissing = gun.magSize - gun.ammoInMag
	const maxAmmoToBeInserted = Math.min(ammo.amount, ammoMissing)

	gun.ammoInMag += maxAmmoToBeInserted
	ammo.amount -= maxAmmoToBeInserted

	localStorage.setItem(ammo.name, JSON.stringify(ammo))
	localStorage.setItem(gun.name, JSON.stringify(gun))

	render()
}

function addAmmoOfType(element){
	//console.log(element)
	const amountToAdd = parseInt(document.getElementById(element).querySelectorAll(".ammoToAdd")[0].value, 10)
	//console.log(amountToAdd)
	let ammoType = JSON.parse(localStorage.getItem(element))
	ammoType.amount += amountToAdd
	localStorage.setItem(element, JSON.stringify(ammoType))
	render()
}

function removeItem(element){
    if (!gunsDependOn(element))
	    localStorage.removeItem(element)
    else
        window.alert("Ammo can't be removed, because there's guns that use that type still!")
	render()
}

function render() {
	document.getElementById("Ammos").innerHTML = ``
	document.getElementById("Guns").innerHTML = ``
	const keys = Object.keys(localStorage)
	//console.log(keys)
	for (const i in keys){
		const key = keys[i]
		const item = JSON.parse(localStorage.getItem(key))

		//console.log(key)
		//console.log(item);

		if(item.type == "Ammo")
		{
			const ammos = document.getElementById("Ammos")
			ammos.innerHTML += `
	  <div class="one-half column" style="margin:1%;" id="${item.name}">
		<h4>${item.name}</h4>

		<p>Total</p> <input type="number" value="${item.amount}" disabled class="totalAmmo"/>

		<p>Ammo to add</p> <input type="number" value="0" class="ammoToAdd"/>

		<input type="button" value="Add" onclick="addAmmoOfType('${item.name}')" />
		<input type="button" value="Remove Ammotype"  onclick="removeItem('${item.name}')" />
	  </div>
`
		}
		else if(item.type == "Gun")
		{
			let ammo = JSON.parse(localStorage.getItem(item.ammoType))

			const guns = document.getElementById("Guns")
			guns.innerHTML += `
	  <div class="one-half column" style="margin:1%;" id="${item.name}">
		<h4>${item.name}</h4>

		<p>Gun-compatible ammo left</p> <input type="number" value="${ammo.amount}" class="totalAmmo" disabled />

		<p>Ammo in mag</p> <input type="number" value="${item.ammoInMag}" disabled class="ammoInMag"/> <p>/ ${item.magSize}</p>

		<input type="button" value="Shoot" onclick="shootGun('${item.name}')" />
		<input type="button" value="Reload" onclick="reloadGun('${item.name}')" />
		<input type="button" value="Remove Gun"  onclick="removeItem('${item.name}')" />
	  </div>
`
		}
	}
}

render()
