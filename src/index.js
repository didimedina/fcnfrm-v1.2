import anime from 'animejs';

anime({
    targets: '.anim-dot',
    translateY: [0, 24],
    loop: true,
    opacity: [1, 0],
    easing: 'easeOutQuad',
    duration: 1200
})


