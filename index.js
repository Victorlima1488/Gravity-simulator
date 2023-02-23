const ball = document.querySelector('.ball')
const background = document.querySelector('.container')
const planet = document.querySelector('.planet')

// Fórmula da aceleração.
let a = -3 * (10 ** (-3))
// let a = -1.11 * (10 ** (-3))

const changePlanet = () => {
    background.classList.toggle('mars')
    ball.classList.toggle('ballMars')
    planet.textContent = "Terra"
    console.log("apertou")
}

planet.addEventListener('click', changePlanet)

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
// console.log(time)

setInterval(() => {
    // Vai pegar o novo momento atual em miliseguntos
    const currentTime = Date.now()
    // console.log(currentTime)

    // Vai obter a diferença de tempo, e esse tempo vai ser enviado para a equação de Torricelli
    const timeGap = currentTime - time
    // console.log(timeGap)
    time = currentTime

    // Pegou a posição da bola
    const bottom = getBallBottom()
    
    // A velocidade que era 0 por estar em repouso, vai receber a aceleração.
    v += a

    // Para quando a bola bater no chão e a velocidade for 0
    if(bottom === 0){
        if(v > -0.1){
            v = 0
        }
        else{
            v *= -1 * 0.8
        }
        
    }

    // Cahamando a posição atual da bola
    const newBottom = getBallNewBottom(bottom, v, timeGap)

    // Atualiza a nova posição da bola no espaço
    ball.style.bottom = `${Math.max(newBottom, 0)}px`
}, 1);
    
