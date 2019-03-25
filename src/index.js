import anime from 'animejs';

const button = document.querySelector('.alert');

button.addEventListener('click', function(){alert('hello!')});

anime({
    targets: '.anim-mouse-dot',
    translateY: [0, 24],
    loop: true,
    opacity: [1, 0],
    easing: 'easeOutQuad',
    duration: 1200
})


