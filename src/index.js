import anime from 'animejs';
import { fromEvent } from 'rxjs';
import { pairwise, map, filter, distinctUntilChanged, startWith } from 'rxjs/operators';

anime({
    targets: '.anim-dot',
    translateY: [0, 24],
    loop: true,
    opacity: [1, 0],
    easing: 'easeOutQuad',
    duration: 1200
});

const timelineContainer = document.getElementById('timeline-container');
const timelineOffset = timelineContainer.offsetTop;
const timelineHeight = timelineContainer.offsetHeight;
const appearOffset = 100;
const disappearOffset = 150;

const timelineMessages = [
    { id: 'timeline-message-1'},
    { id: 'timeline-message-2'},
    { id: 'timeline-message-3'},
    { id: 'timeline-message-4'},
    { id: 'timeline-message-5'},
    { id: 'timeline-message-6'}
];

// Setup a pairwise scorll source
const source = fromEvent(document, 'scroll').pipe(
    map(_ => window.scrollY),
    pairwise(),
    startWith([window.scrollY, window.scrollY])
);

const timelineAnimation = anime({
    easing: 'linear',
    targets: '.timeline',
    width: ['0%', '100%'],
    autoplay: false
});

source.subscribe(([y1, y2]) => {
    const seekOffset = Math.min(Math.max(( y2 - appearOffset ) / timelineHeight, 0), 1);
    console.log(`Seek: ${timelineAnimation.duration * seekOffset} [${timelineAnimation.duration}, ${y2}, ${window.innerHeight}, ${timelineHeight}]`);
    timelineAnimation.seek( timelineAnimation.duration * seekOffset );
});

for (const message of timelineMessages) {
    // For each message:
    // - calculate the threshold
    // - initialize the animation
    // - set the observables for appear and disappear
    
    const messageElement = document.getElementById(message.id);
    // Add appearOffset so that the element is entirely visible when starting to animate
    message.threshold = timelineOffset - window.innerHeight + messageElement.offsetTop + appearOffset;
    message.animation = anime({
        targets: `#${message.id}`,
        left: ['-50%', '50%'],
        duration: 500,
        autoplay: false,
        easing: 'cubicBezier(.5, .05, .1, .3)'
    });

    // Observalbe that only fires when the message should appear
    source.pipe(
        filter(([y1, y2]) => y2 >= y1),
        map(([y1, y2]) => {
            console.log(`${y1}, ${y2}, ${message.animation.progress}`);
            return y2 > message.threshold && message.animation.progress === 0; }),
        filter(shouldStart => shouldStart)
    ).subscribe(shouldStartAnimation => {
        console.log(`Start ${shouldStartAnimation}`);
        message.animation.direction = 'normal';
        message.animation.play();
    });
    // Observalbe that only fires when the message should disappear
    source.pipe(
        filter(([y1, y2]) => y2 <= y1),
        map(([y1, y2]) => {
            console.log(`${y1}, ${y2}, ${message.animation.progress}, ${message.threshold}`);
            return y2 < (message.threshold + disappearOffset) && message.animation.progress > 0;}),
        filter(shouldStart => shouldStart)
    ).subscribe(shouldStartAnimation => {
        console.log(`Reverse: ${shouldStartAnimation}`);
        message.animation.direction = 'reverse';
        message.animation.play();
    });
}




let promoVideoCTA = document.querySelector('.anim-promo-video-cta');

promoVideoCTA.addEventListener('click', function () {

    promoVideoCTA.style.visibility = "hidden";
    document.querySelector('.anim-promo-video').src = 'https://www.youtube.com/embed/3s3UeXjzO74?autoplay=1&controls=1';

    anime({
        targets: '.anim-promo-video-container',
        scale: [1, 1.05],
        easing: 'spring(1, 80, 10, 0)',
        duration: 500
    })
})


