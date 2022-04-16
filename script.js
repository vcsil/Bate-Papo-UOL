function removeTextoSuporte(elemento) {
    const textoDoUsuario = elemento.innerHTML
    if (textoDoUsuario === '') {
        document.querySelector(".textoSuporte").classList.remove("hidden")
    } else {
        document.querySelector(".textoSuporte").classList.add("hidden")
    }
}