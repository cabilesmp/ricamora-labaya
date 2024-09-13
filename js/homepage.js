const navLinks = document.querySelectorAll('.nav-link')
const detailsBtn = document.getElementById('detailsBtn')
const sections = document.querySelectorAll('section')

navLinks.forEach((n) => {
    n.addEventListener('click', () => {
        navLinks.forEach((n1) => n1.classList.remove('active'))
        n.classList.add('active')
    })
})

detailsBtn.addEventListener('click', () => {
    document.getElementById('location').scrollIntoView({behavior: 'smooth'})
})

document.addEventListener('scroll', () => {
    sections.forEach((s) => {
        const sectionTop = s.offsetTop
        const sectionHeight = s.offsetHeight

        if (scrollY >= sectionTop - 300 && scrollY < sectionTop + sectionHeight) {
            let hrefValue = '#' + s.getAttribute('id')
            navLinks.forEach((n) => {
                n.classList.remove('active')
                if (n.getAttribute('href') === hrefValue) {
                    n.classList.add('active')
                }
            })
        }
    })
})