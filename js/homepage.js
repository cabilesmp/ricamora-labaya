const navLinks = document.querySelectorAll('.navLink')

navLinks.forEach((n) => {
    n.addEventListener('click', () => {
        navLinks.forEach((n1) => n1.classList.remove('active'))
        n.classList.add('active')
    })
})