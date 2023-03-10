const ball = document.querySelector('.ball')
const background = document.querySelector('.container')
const planet = document.querySelector('.planet')
const reload = document.querySelector('.reload')
const stopwatch = document.querySelector('.stopwatch')
const acceleration = document.querySelector('.acceleration')

// Fórmula da aceleração na terra.
let a = -3 * (10 ** (-3))

acceleration.textContent = "a = 9,8 m/s²"

const reloadPage = () => {
    location.reload()
}

reload.addEventListener('click', reloadPage)

// Essa fórmula mostra a posição em pixel em relação ao ao chão.
const getBallBottom = () => {
    const { bottom } = getComputedStyle(ball) // Essa função pega o estilo posto pelo css, ou mesmo pelo JS do elemento em forma de objeto. Mas, com a técnica da desestruturação, pego o elemento de estilo em especifico.  
    const bottomNumber = +bottom.replace('px', '')
    return bottomNumber
}

// s = s0 + vt + 1/2 * at^2 Torricelli
// Essa função vai retornar a posição final da bola
const getBallNewBottom = (s0, v, t) => {
    let s = s0 + v * t + 0.5 * a * (t ** 2) 
    return s
}

// Iniciando a velocidade em 0
let v = 0

// Vai pegar o momento atual em miliseguntos
let time = Date.now()

setInterval(() => {
    // Vai pegar o novo momento atual em miliseguntos
    const currentTime = Date.now()

    // Vai obter a diferença de tempo, e esse tempo vai ser enviado para a equação de Torricelli
    const timeGap = currentTime - time

    time = currentTime

    // Pegou a posição da bola
    const bottom = getBallBottom()
    
    // A velocidade que era 0 por estar em repouso, vai receber a aceleração.
    v += a

    // Para quando a bola bater no chão e a velocidade for 0
    if(bottom === 0){
        if(v > -0.1){
            v = 0
            clearInterval(timer)
        }
        else{
            v *= -1 * 0.7
        }      
    }

    // Cahamando a posição atual da bola
    const newBottom = getBallNewBottom(bottom, v, timeGap)

    // Atualiza a nova posição da bola no espaço
    ball.style.bottom = `${Math.max(newBottom, 0)}px`
}, 1);

let timeClock = 0

let timer = setInterval(()=>{
    timeClock++
    stopwatch.textContent = formatTime(timeClock)
    console.log(timeClock)
}, 1000) 

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
  
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const formattedSeconds = (seconds < 10) ? `0${seconds}` : seconds;
  
    // Retorna o tempo formatado no formato "mm:ss"
    return `${formattedMinutes}:${formattedSeconds}`;
  }


 
  
  
  
  
  
  
