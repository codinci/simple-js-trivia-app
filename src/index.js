console.log('I can see the index.js');


// var counter = document.getElementById('counter').getContext('2d');
// var no = 10;
// var pointToFill = 4.72;
// var cw = counter.canvas.width;
// var ch = counter.canvas.height;
// var diff;

// function fillCounter() {
//     diff = ((no / 10) * Math.PI * 2 * 10);
//     counter.clearRect(0, 0, cw, ch);
//     counter.lineWidth = 15;
//     counter.fillStyle = '#000';
//     counter.strokeStyle = '#F5E0A9';
//     counter.textAlign = 'center';
//     counter.font = "25px monospace";
//     counter.fillText(no + 'sec', 100, 110);
//     counter.beginPath();
//     counter.arc(100, 100, 90, pointToFill, diff / 10 + pointToFill);
//     counter.stroke();

//     if (no == 0) {
//         clearTimeout(fill);
//         counter.fillStyle = '#FFF';
//         counter.fillRect(0, 0, cw, ch);
//         counter.fillStyle = '#000';
//         counter.fillText('Times up', 100, 110);
        
//     }
//     no--;
// }

// var fill = setInterval(fillCounter, 1000);