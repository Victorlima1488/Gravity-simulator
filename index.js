const ball = document.querySelector('.ball')

const a = -3 * (10 ** (-3))

const getBallBottom = () => {
    const { bottom } = getComputedStyle(ball)
    const bottomNumber = +bottom.replace('px', '')

    return bottomNumber

}

// s = s0 + vt + 1/2 * at^2

const getBallNewBottom = (s0, v, t) => {
    let s = s0 + v * t + 0.5 * a * (t ** 2) 
    return s
}

let v = 0

let time = Date.now()

setInterval(() => {
    const currentTime = Date.now()
    const timeGap = currentTime - time
    time = currentTime

    const bottom = getBallBottom()
    

    v += a
    if(bottom === 0){
        if(v > -0.1){
            v = 0
        }
        else{
            v *= -1 * 0.5
        }
        
    }

    const newBottom = getBallNewBottom(bottom, v, timeGap)

    ball.style.bottom = `${Math.max(newBottom, 0)}px`
}, 0.5);
    
