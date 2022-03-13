"use strict"

const ammoInMag = document.getElementById("ammoinmag")
const addAmmoInput = document.getElementById("addammo")
const totalAmmo = document.getElementById("totalammo")
const maxAmmo = document.getElementById("maxammo")

function saveData(){
	localStorage.setItem("ammoInMag", ammoInMag.value)
	localStorage.setItem("totalAmmo", totalAmmo.value)
	localStorage.setItem("maxAmmo", maxAmmo.value)
	console.log("saved")
}

function loadData(){
	ammoInMag.value = localStorage.getItem("ammoInMag") || 0
	totalAmmo.value = localStorage.getItem("totalAmmo") || 0
	maxAmmo.value = localStorage.getItem("maxAmmo") || 0
}


function addAmmo(){
	totalAmmo.value = BigInt(totalAmmo.value, 10) + BigInt(addAmmoInput.value, 10)
	saveData()
}

function shoot(){
	if(BigInt(ammoInMag.value, 10)< 1)
	{
		window.alert("Mag is empty! Couldn't shoot!")
		return
	}

	ammoInMag.value = BigInt(ammoInMag.value, 10) - BigInt(1)
	saveData()
}

function abs(bigint)
{
	return bigint < BigInt(0) ? -bigint : bigint;
}
function min(a, b)
{	
	if (a > b) return b
	return a
}

function reload(){
	if(BigInt(totalAmmo.value, 10) < 1)
	{
		window.alert("No ammo! Wasn't able to reload!")
		return
	}
	
	const ammoMissing = BigInt(maxAmmo.value, 10) - BigInt(ammoInMag.value, 10)
	const maxAmmoToBeInserted = min(ammoMissing, BigInt(totalAmmo.value,10))
	
	ammoInMag.value = BigInt(ammoInMag.value, 10) + maxAmmoToBeInserted
	totalAmmo.value = BigInt(totalAmmo.value, 10) - maxAmmoToBeInserted

	saveData()
}

function reset(){
	totalAmmo.value = 0
	ammoInMag.value = 0
	maxAmmo.value = 0
	saveData()
}

loadData()

