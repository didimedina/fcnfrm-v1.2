import anime from 'animejs';

const button = document.querySelector('.alert');

button.addEventListener('click', function(){alert('hello!')});

anime({
    targets: '.anim-scale',
    scale: [0.8, 1],
    opacity: [0, 1],
    translateY: [150, 0],
    easing: 'easeOutQuad',
    duration: 800
})


