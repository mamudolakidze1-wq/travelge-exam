document.addEventListener('DOMContentLoaded', () => {

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle'); 
            
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    const guidesContainer = document.getElementById('guidesContainer');

    if (guidesContainer) {
        async function getGuides() {
            try {
                const response = await fetch('guides.json');
                
                if (!response.ok) throw new Error('JSON ფაილი ვერ მოიძებნა');

                const data = await response.json();
                guidesContainer.innerHTML = ''; 

                data.forEach(user => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    const imgSource = user.avatar ? user.avatar : 'https://via.placeholder.com/150';
                    
                    card.innerHTML = `
                        <img src="${imgSource}" alt="${user.name}">
                        <h3>${user.name}</h3>
                        <p style="color: #fca311; font-weight: bold;">${user.languages || 'English'}</p>
                        <p style="font-size: 0.9rem;">${user.desc || 'პროფესიონალი გიდი'}</p>
                    `;
                    guidesContainer.appendChild(card);
                });
            } catch (error) {
                console.log('API Error, loading fallback:', error);
                // თუ JSON ვერ წაიკითხა, ეს ტექსტი გამოჩნდება რომ საიტი არ დამახინჯდეს
                guidesContainer.innerHTML = `<p style="color: #233142;">მონაცემების ჩატვირთვა ვერ მოხერხდა. სცადეთ მოგვიანებით.</p>`;
            }
        }
        getGuides();
    }

    const toursContainer = document.getElementById('toursContainer');

    if (toursContainer) {
        async function getTours() {
            try {
                const response = await fetch("tours.json");
                if (!response.ok) throw new Error('tours.json ვერ მოიძებნა');

                const data = await response.json();
                toursContainer.innerHTML = ''; 

                data.forEach(tour => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    
                    card.innerHTML = `
                        <img src="${tour.image}" alt="${tour.title}">
                        <h3>${tour.title}</h3>
                        <p style="color: #fca311; font-weight: bold; font-size: 1.2rem;">${tour.price}</p>
                        <p style="font-size: 0.9rem;">${tour.desc}</p>
                        <button class="btn" style="margin-top:10px; padding: 5px 15px; font-size: 0.8rem; cursor:pointer;">დაჯავშნა</button>
                    `;
                    toursContainer.appendChild(card);
                });
            } catch (error) {
                console.error(error);
                toursContainer.innerHTML = `<p>ტურები ვერ ჩაიტვირთა.</p>`;
            }
        }
        getTours();
    }

    const form = document.getElementById('registrationForm');

    if (form) {
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const togglePass = document.getElementById('togglePassword'); 

        // Show/Hide Password
        if (togglePass && password) {
            togglePass.addEventListener('click', () => {
                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                password.setAttribute('type', type);
                
                togglePass.classList.toggle('fa-eye');
                togglePass.classList.toggle('fa-eye-slash');
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            let isValid = true;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(username.value.trim() === '') {
                setError(username);
                isValid = false;
            } else {
                removeError(username);
            }

            if(!emailRegex.test(email.value.trim())) {
                setError(email);
                isValid = false;
            } else {
                removeError(email);
            }

            if(password.value.trim() === '') {
                setError(password); 
                isValid = false;
            } else {
                removeError(password);
            }

            if(isValid) {
                alert('წარმატება! რეგისტრაცია გავლილია.');
                form.reset();
            }
        });

        function setError(input) {
            const group = input.closest('.input-group'); 
            group.classList.add('error');
        }

        function removeError(input) {
            const group = input.closest('.input-group');
            group.classList.remove('error');
        }
    }

    const cookieBox = document.getElementById('cookieBox');
    const acceptBtn = document.getElementById('acceptCookie');

    if (cookieBox && !localStorage.getItem('cookieAccepted')) {
        setTimeout(() => cookieBox.classList.add('active'), 2000);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieAccepted', 'true');
            cookieBox.classList.remove('active');
        });
    }

    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        const localImages = [
            'images/geo1.jpg',
            'images/geo2.jpg',
            'images/geo3.jpg',
            'images/geo4.jpg',
            'images/geo5.jpg',
            'images/geo6.jpg',
            'images/geo7.jpg'
        ];

        setInterval(() => {
            const randomImage = localImages[Math.floor(Math.random() * localImages.length)];
            heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${randomImage}')`;
        }, 5000);
    }

});
