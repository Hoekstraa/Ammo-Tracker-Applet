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
	totalAmmo.value = parseInt(totalAmmo.value, 10) + parseInt(addAmmoInput.value, 10)
	saveData()
}

function shoot(){
	if(parseInt(ammoInMag.value, 10)< 1)
	{
		window.alert("Mag is empty! Couldn't shoot!")
		return
	}

	ammoInMag.value = parseInt(ammoInMag.value, 10) - 1
	saveData()
}

function reload(){
	if(parseInt(totalAmmo.value, 10) < 1)
	{
		window.alert("No ammo! Wasn't able to reload!")
		return
	}

	var removedFromTotal = parseInt(maxAmmo.value, 10) - parseInt(ammoInMag.value, 10)
	var remainingAmmo = parseInt(totalAmmo.value, 10) - removedFromTotal

	if (remainingAmmo < 0)
	{
		var diff = Math.abs(remainingAmmo)
		ammoInMag.value = parseInt(ammoInMag.value, 10) + parseInt(maxAmmo.value, 10) - diff
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
