const navLinks = document.querySelectorAll('.nav-link')
const detailsBtn = document.getElementById('detailsBtn')
const sections = document.querySelectorAll('section')
const rsvpBtn1 = document.getElementById('rsvpBtn1')
const countDiv = document.getElementById('countDiv')
const audioDiv = document.getElementById('bgMusic')
const loader = document.getElementById('loader')
const success = document.getElementById('success')
const url = new URL(window.location.href)
const params = new URLSearchParams(url.search)
let hasPlayed = false

if (params.toString()) {
    const count = params.get('invite')
    const textMap = {
        0: "Zero",
        1: "One",
        2: "Two",
        3: "Three",
        4: "Four",
        5: "Five",
        6: "Six",
        7: "Seven",
        8: "Eight",
        9: "Nine",
        10: "Ten"
    };

    if (count > 1) {
        document.getElementById('name2Div').style.display = ''
    }

    let rsvpText = `${textMap[count]} (${count}) seat has been reserved in your honor.`
    document.getElementById('rsvpText1').innerHTML = rsvpText
    document.getElementById('count').setAttribute('max', count)


} else {
    document.getElementById('rsvpForm').style.display = 'none'
    document.getElementById('rsvpText2').style.display = 'none'
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
            document.getElementById('body').classList.remove('overflow-hidden')
            document.getElementById('body').classList.add('overflow-auto')
        })
    }
})

function saveRSVPyes() {
    if (params.toString()) {
        const count = params.get('invite')
        const fullName = document.getElementById('fullName').value
        const guestCt = document.getElementById('count').value

        if (fullName.trim() === '') {
            showError('Please provide full name.')
        } else {
            if (count > 1 && (guestCt > count || guestCt == 0 || guestCt === '')) {
                showError(`Please review number of guests. You may input 1 - ${count}`)
            } else {
                document.getElementById('buttons').classList.add('d-none')
                loader.classList.remove('d-none')
                let jsonBody = [fullName, 'Yes', count, guestCt]
                sendResponse(jsonBody)
            }
        }
    }
}

function saveRSVPno() {
    const fullName = document.getElementById('fullName').value

    if (fullName.trim() === '') {
        showError('Please provide full name.')
    } else {
        document.getElementById('buttons').classList.add('d-none')
        loader.classList.remove('d-none')
        let jsonBody = [fullName, 'No', count, 0]
        sendResponse(jsonBody)
    }
}

function showError(message) {
    const error = document.getElementById('error')
    const errorMsg = document.getElementById('errorMsg')

    errorMsg.innerHTML = message
    error.classList.remove('d-none')

    setTimeout(() => {
        error.classList.add('d-none')
    }, 3000)
}

function sendResponse(body) {
    const url = 'https://script.google.com/macros/s/AKfycbzlZyVEde9aM8pluAXF-zCdthFVMIPyrtnEnPEZsNtw1CfrEYCpbNJynovrdXsknWjRew/exec'
    
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(() => {
        loader.classList.add('d-none')
        success.classList.remove('d-none')

        setTimeout(() => {
            success.classList.add('d-none')
        }, 3000)
    })
}