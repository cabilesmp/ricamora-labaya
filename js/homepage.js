const navLinks = document.querySelectorAll('.nav-link')
const detailsBtn = document.getElementById('detailsBtn')
const sections = document.querySelectorAll('section')
const rsvpBtn1 = document.getElementById('rsvpBtn1')
const countDiv = document.getElementById('countDiv')
const audioDiv = document.getElementById('bgMusic')
const url = new URL(window.location.href)
const params = new URLSearchParams(url.search)
const count = params.get('invite')
let hasPlayed = false

if (count == 2) {
    countDiv.innerHTML = 'Two (2) seats have been reserved in your honor.'
    document.getElementById('name1').innerHTML = 'Guest 1 Full Name'
    document.getElementById('name2').innerHTML = 'Guest 2 Full Name'
    document.getElementById('name2Div').style.display = ''
} else if (count == 1) {
    countDiv.innerHTML = 'One (1) seat has been reserved in your honor.'
}

navLinks.forEach((n) => {
    n.addEventListener('click', () => {
        navLinks.forEach((n1) => n1.classList.remove('active'))
        n.classList.add('active')
    })
})

detailsBtn.addEventListener('click', () => {
    document.getElementById('location').scrollIntoView({behavior: 'smooth'})
})

rsvpBtn1.addEventListener('click', () => {
    document.getElementById('rsvp').scrollIntoView({behavior: 'smooth'})
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

document.addEventListener('click', () => {
    if (!hasPlayed) {
        audioDiv.play().then(() => {
            hasPlayed = true
        })
    }
})