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

	ammoInMag.value = BigInt(ammoInMag.value, 10) - 1
	saveData()
}

function reload(){
	if(BigInt(totalAmmo.value, 10) < 1)
	{
		window.alert("No ammo! Wasn't able to reload!")
		return
	}

	var removedFromTotal = BigInt(maxAmmo.value, 10) - BigInt(ammoInMag.value, 10)
	var remainingAmmo = BigInt(totalAmmo.value, 10) - removedFromTotal

	if (remainingAmmo < 0)
	{
		var diff = Math.abs(remainingAmmo)
		ammoInMag.value = BigInt(ammoInMag.value, 10) + BigInt(maxAmmo.value, 10) - diff
		totalAmmo.value = 0
	}
	else
	{
		ammoInMag.value = maxAmmo.value
		totalAmmo.value = remainingAmmo
	}

	saveData()
}

function reset(){
	totalAmmo.value = 0
	ammoInMag.value = 0
	maxAmmo.value = 0
	saveData()
}

loadData()
