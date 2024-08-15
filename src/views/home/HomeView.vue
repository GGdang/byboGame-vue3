<script setup>
import * as THREE from 'three'
import { onMounted, ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { initTelegramWebApp } from '@/lib/telegramWebApp'
import { TonConnectButton, useTonWallet, useTonAddress } from '@townsquarelabs/ui-vue'
const telegramUserInfo = ref({})
const userFriendlyAddress = useTonAddress()
const rawAddress = useTonAddress(false)
const wallet = useTonWallet()
const router = useRouter()
const isNotTelegramOpenDialog = ref(false)
let scene = null
let camera = null
let renderer = null
let dice = []
let controls = null
let diceCanvas = null
let cube = null

const createDiceTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, 512, 512)

  ctx.fillStyle = 'black'
  ctx.font = 'bold 100px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let i = 0; i < 12; i++) {
    const x = (i % 4) * 128 + 64
    const y = Math.floor(i / 4) * 128 + 64
    ctx.fillText((i + 1).toString(), x, y)
  }

  return new THREE.CanvasTexture(canvas)
}

const createDie = (canvas) => {
  const radius = 2
  const geometry = new THREE.DodecahedronGeometry(radius)
  const texture = createDiceTexture()
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.5,
    metalness: 0.5
  })
  // 为每个面设置正确的UV坐标
  const uvAttribute = geometry.getAttribute('uv')
  const faceIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  for (let i = 0; i < uvAttribute.count; i++) {
    const faceIndex = Math.floor(i / 3)
    const u = (faceIndices[faceIndex] % 4) / 4
    const v = 1 - Math.floor(faceIndices[faceIndex] / 4) / 3
    uvAttribute.setXY(i, u, v)
  }

  return new THREE.Mesh(geometry, material)
}

const createFaceTexture = (number) => {
  // 創建每個面的材質（數字貼圖）
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext('2d')

  context.fillStyle = 'white'
  context.fillRect(0, 0, 256, 256)

  context.fillStyle = 'black'
  context.font = 'bold 150px Arial'
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  context.fillText(number, 75, 200)

  return canvas
}

const animate = () => {
  requestAnimationFrame(animate)

  // 旋轉骰子
  dice.forEach((die) => {
    die.rotation.x += 0.01 * 0.5
    die.rotation.y += 0.01
    die.rotation.z += 0.01 * 0.3
  })
  renderer.render(scene, camera)
}

const rollSingleDie = (dice, index) => {
  const randomNumber = Math.floor(Math.random() * 12) + 1
  const texture = new THREE.CanvasTexture(createFaceTexture(randomNumber))
  dice.material[index] = new THREE.MeshBasicMaterial({ map: texture })
}

const rollDice = () => {
  rollSingleDie(dice.value[0], 0)
  setTimeout(() => rollSingleDie(dice.value[1], 1), 500)
  setTimeout(() => rollSingleDie(dice.value[2], 2), 1000)
}

const initThreeJS = (canvas) => {
  // 初始化場景、攝影機和渲染器
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)

  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setClearColor(0xffffff)
  renderer.setClearColor(0xcccccc) // 设置浅灰色背景，以便更容易看到问题
  // 添加环境光和平行光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  // 創建三個骰子並添加到場景中
  for (let i = 0; i < 3; i++) {
    const die = createDie(canvas)
    die.position.x = i * 4 - 4 // 分开骰子的位置
    die.position.y = 0
    die.position.z = 0
    scene.add(die)
    dice.push(die)
  }
  // const geometry = new THREE.BoxGeometry(2, 2, 2)
  // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) // 红色材质
  // cube = new THREE.Mesh(geometry, material)
  // scene.add(cube)
  camera.position.z = 5
}

const threeJS = {
  scene: null,
  camera: null,
  renderer: null,
  cube: null,
  init(canvas) {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    )
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    // this.renderer.setClearColor(0x2c3e50) // 设置深色背景

    // 添加一个明显的物体
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) // 红色材质
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
    this.camera.position.z = 5
  },
  animate() {
    requestAnimationFrame(() => this.animate())
    if (this.cube) {
      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01
    }
    this.renderer.render(this.scene, this.camera)
  }
}

const isDev = computed(() => {
  // eslint-disable-next-line no-undef
  return process.env.NODE_ENV === 'development'
})

const gotoStartGamePage = () => {
  if (telegramUserInfo.value.id || isDev) {
    router.push('/start')
  } else {
    isNotTelegramOpenDialog.value = true
  }
}

// 窗口大小变化时调整渲染器大小
const handleResize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

onMounted(() => {
  try {
    const canvas = document.querySelector('.dice-canvas')
    initThreeJS(canvas)
    animate()
  } catch (error) {
    console.log(error)
  }
})

onMounted(() => {
  try {
    initTelegramWebApp()
  } catch (e) {
    console.error('Failed to initialize Telegram WebApp:', e)
  }
  const params = new URLSearchParams(window?.Telegram?.WebApp?.initData)
  const userData = Object.fromEntries(params)
  if (Object.keys(userData).length > 0) {
    telegramUserInfo.value = JSON.parse(userData.user)
  }
})

onUnmounted(() => {
  if (controls) {
    controls.dispose()
  }
  // window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <main class="h-100">
    <h1 class="text-center">Cybo Game</h1>
    <div class="d-flex flex-column align-center justify-center">
      <v-btn class="bg-blue" @click="gotoStartGamePage"> Start </v-btn>
    </div>
    <div>
      <p>
        {{ telegramUserInfo }}
      </p>
    </div>
    <div class="ht-10"></div>
    <div>
      <TonConnectButton className="custom-class" :styles="{ color: 'red' }"> </TonConnectButton>
    </div>
    <div class="ht-10"></div>
    <v-btn @click="rollDice">Roll Dice</v-btn>
    <div class="ht-10"></div>
    <canvas class="dice-canvas"></canvas>
    <div v-if="wallet">
      <div>Connected Wallet: {{ wallet.name }}</div>
      <div>Device: {{ wallet.device.appName }}</div>
      <div>User-friendly address: {{ userFriendlyAddress }}</div>
      <div>Raw address: {{ rawAddress }}</div>
    </div>
    <v-dialog persistent v-model="isNotTelegramOpenDialog" width="auto">
      <v-card class="pa-3" max-width="350" persistent>
        <div class="px-5">
          <p>請用 telegram 開啟遊戲</p>
        </div>
        <div class="ht-5"></div>
        <div class="d-flex justify-center">
          <v-btn color="green-lighten-4" @click="isNotTelegramOpenDialog = false"> Close </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </main>
</template>

<style lang="scss" scoped>
@import url('./HomeView.scss');
</style>
