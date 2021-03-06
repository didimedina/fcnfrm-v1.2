import anime from 'animejs';
import { fromEvent } from 'rxjs';
import { pairwise, map, filter, distinctUntilChanged, startWith } from 'rxjs/operators';

function print(el) {
    console.log(el);
};

anime({
    targets: '.anim-dot',
    translateY: [0, 24],
    loop: true,
    opacity: [1, 0],
    easing: 'easeOutQuad',
    duration: 1200
});

// const timelineMessages = [
//     { id: 'timeline-message-1'},
//     { id: 'timeline-message-2'},
//     { id: 'timeline-message-3'},
//     { id: 'timeline-message-4'},
//     { id: 'timeline-message-5'},
//     { id: 'timeline-message-6'}
// ];

// Setup a pairwise scorll source
const source = fromEvent(document, 'scroll').pipe(
    map(_ => window.scrollY),
    pairwise(),
    startWith([window.scrollY, window.scrollY])
);

const appearOffset = window.innerHeight;
const timeline = document.querySelector('.TIMELINE');
const timelineContainer = document.querySelector('.TIMELINE-CONTAINER');
const timelineHeight = timeline.offsetHeight;
const timelineMessages = document.querySelectorAll('.TIMELINE__MESSAGE');

function setOffset(el, threshold) {
    let elRect = el.getBoundingClientRect(),
        bodyRect = document.body.getBoundingClientRect(),
        offset = elRect.top - bodyRect.top;

    alert('Element is ' + offset + ' vertical pixels from <body>');
}

let el = timelineContainer;

let elRect = el.getBoundingClientRect(),
    bodyRect = document.body.getBoundingClientRect(),
    offset = elRect.top - bodyRect.top;

print('Element is ' + offset + ' vertical pixels from <body>');

const timelinePinAnimation = anime({
    easing: 'linear',
    targets: '.TIMELINE__EVENTS',
    'margin-left': ['0%', '80%'],
    autoplay: false
});

source.subscribe(([y1, y2]) => {
    const seekOffset = Math.min(Math.max((y2 - appearOffset) / timelineHeight, 0), 1);
    // print(`Y1: ${y1} Y2: ${y2} Window: ${window.innerHeight} Container: ${timelineHeight}`);

    // Always 'clean' the timeline classes
    timelineContainer.classList.remove('fixed', 'absolute', 'tl-pin');
    // Now add the proper classes based on the condition
    if (y2 < window.innerHeight) {
        timelineContainer.classList.add('absolute');
    } else if(y2 >= window.innerHeight && y2 < (timelineHeight + window.innerHeight * 0.2 - window.innerHeight * 0.5)) {
        // print('Fixed top');
        timelineContainer.classList.add('fixed');
        print(`Y2: ${y2} ${(appearOffset + timelineHeight) * .4}`)
        if  (y2 < (appearOffset + timelineHeight) * .4){
            //show msg-2 
            // print('msg-2');
        } else if (y2 < timelineHeight * .2) {
            // show msg-3
            // print('msg-2');
        }
        
    } else if (y2 >= (timelineHeight + window.innerHeight * 0.2 - window.innerHeight * 0.5)) {
        // print('Absolute bottom');
        timelineContainer.classList.add('absolute', 'tl-pin');
    }  

    // console.log(`Seek: ${timelinePinAnimation.duration * seekOffset} [${timelinePinAnimation.duration}, ${y2}, ${window.innerHeight}, ${timelineHeight}]`);
    timelinePinAnimation.seek(timelinePinAnimation.duration * seekOffset);
});



print(timelineMessages);

// for (const message of timelineMessages) {
//     // For each message:
//     // - calculate the threshold
//     // - initialize the animation
//     // - set the observables for appear and disappear
    
//     const messageElement = document.getElementById(message.id);
//     // print(messageElement);
//     // Add appearOffset so that the element is entirely visible when starting to animate
//     message.threshold = timelineOffset - window.innerHeight + messageElement.offsetTop + appearOffset;
//     message.animation = anime({
//         targets: `#${message.id}`,
//         left: ['-5%', '0%'],
//         duration: 500,
//         autoplay: false,
//         easing: 'cubicBezier(.5, .05, .1, .3)'
//     });

//     // Observalbe that only fires when the message should appear
//     source.pipe(
//         filter(([y1, y2]) => y2 >= y1),
//         map(([y1, y2]) => {
//             console.log(`${y1}, ${y2}, ${message.animation.progress}`);
//             return y2 > message.threshold && message.animation.progress === 0; }),
//         filter(shouldStart => shouldStart)
//     ).subscribe(shouldStartAnimation => {
//         console.log(`Start ${shouldStartAnimation}`);
//         message.animation.direction = 'normal';
//         message.animation.play();
//     });
//     // Observalbe that only fires when the message should disappear
//     source.pipe(
//         filter(([y1, y2]) => y2 <= y1),
//         map(([y1, y2]) => {
//             console.log(`${y1}, ${y2}, ${message.animation.progress}, ${message.threshold}`);
//             return y2 < (message.threshold + disappearOffset) && message.animation.progress > 0;}),
//         filter(shouldStart => shouldStart)
//     ).subscribe(shouldStartAnimation => {
//         console.log(`Reverse: ${shouldStartAnimation}`);
//         message.animation.direction = 'reverse';
//         message.animation.play();
//     });
// }




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


