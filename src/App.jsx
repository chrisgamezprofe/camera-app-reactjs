
import { Container, Card, Icon, Image, Button } from 'semantic-ui-react'
import './App.css'
import { useEffect, useRef, useState } from 'react'

function App() {
  const videoDiv = useRef()
  const fotoDiv = useRef()
  const [hayFoto,setHayFoto] = useState(false)

  const verCamara = () => {
    navigator.mediaDevices
      .getUserMedia({
      video:{width:1920,height:1080}
      })
      .then(stream => {
        let miVideo = videoDiv.current;
        miVideo.srcObject = stream;
        miVideo.play()
      }).catch(err => {
      console.log(err)
    })
  }

  const tomarFoto = () => {
    const w = 430
    const h = w / (16 / 9)
    
    let video = videoDiv.current
    let foto = fotoDiv.current

    foto.width = w
    foto.height = h
    let context = foto.getContext('2d')
    context.drawImage(video, 0, 0, w, h);
    setHayFoto(true)
  }

  const cerrarFoto = () => {
    let f = fotoDiv.current
    let context = f.getContext('2d')
    context.clearRect(0, 0, f.width,f.height)
    setHayFoto(false)
  }

  useEffect(() => {
    verCamara();
  },[videoDiv])



  return (
    <>
      <Container className='miApp' fluid textAlign='center'>
        <Card.Group centered>
          <Card>
          <video ref={videoDiv}></video>
          <Card.Content>
            <Button color='teal' onClick={tomarFoto}><Icon name='camera' /> Tomar foto</Button>
          </Card.Content>
        </Card>
       <Card>
            <canvas ref={fotoDiv}></canvas>
            <Card.Content>
              <Button color='red' onClick={cerrarFoto}><Icon name='close'/> Cerrar</Button>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
      
    </>
  )
}

export default App
