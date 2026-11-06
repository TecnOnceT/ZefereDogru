// ==========================================
// 1. THREE.JS VE SƏHNƏ QURULUMU
// ==========================================
const container = document.getElementById('three-container');

const scene = new THREE.Scene();

// Varsayılan kamera (GLB kameraları yüklenene kadar)
let currentCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
currentCamera.position.set(0, 15, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// OrbitControls (Otomatik dönme KAPALI)
const controls = new THREE.OrbitControls(currentCamera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = false;

// İşıqlandırma
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(10, 20, 15);
scene.add(dirLight);

// ==========================================
// 2. DƏYİŞƏNLƏR VƏ RAYCASTER (SEÇİM ÜÇÜN)
// ==========================================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let azerbaijanModel = null;
let armeniaModel = null;

let regionsMap = {};     // Bölgelere isimleriyle hızlı erişmek için { "Susha": mesh, ... }
let regionsList = [];    // Raycaster tıklaması için mesh listesi
let loadedCameras = [];  // GLB içinden çıkan kameralar
let selectedRegion = null;

// Rəng Kodları
const COLORS = {
    isgal: 0xef4444,    // İşğal altında (Qırmızı)
    azad: 0x10b981,     // Azad edilib (Yeşil)
    tehvil: 0x38bdf8,   // Bəyanatla təhvil (Mavi)
    selected: 0xf59e0b // Seçilən bölge (Sarı/Narıncı)
};

// ==========================================
// 3. 44 GÜNLÜK VƏTƏN MÜHARİBƏSİ MƏLUMATLARI
// ==========================================
const daysData = [
    { day: 0, title: "26 Sentyabr 2020", text: "Müharibədən əvvəlki vəziyyət.", cameraIndex: 0, liberated: [] },
    { day: 1, title: "27 Sentyabr 2020", text: "Əks-hücum əməliyyatı başladı. Füzuli və Cəbrayıl istiqamətində kəndlər azad edildi.", cameraIndex: 0, liberated: ["Fuzuli_Village1", "Jabrayil_Village1"] },
    { day: 8, title: "4 Oktyabr 2020", text: "Cəbrayıl şəhəri və bir neçə kənd azad edildi!", cameraIndex: 1, liberated: ["Jabrayil"] },
    { day: 22, title: "18 Oktyabr 2020", text: "Xudafərin körpüsü üzərində Azərbaycan bayrağı qaldırıldı.", cameraIndex: 1, liberated: ["Khudaferin"] },
    { day: 24, title: "20 Oktyabr 2020", text: "Zəngilan şəhəri azad edildi!", cameraIndex: 2, liberated: ["Zangilan"] },
    { day: 29, title: "25 Oktyabr 2020", text: "Qubadlı şəhəri azad edildi!", cameraIndex: 2, liberated: ["Qubadli"] },
    { day: 42, title: "8 Noyabr 2020", text: "Qarabağın tacı Şuşa şəhəri azad edildi!", cameraIndex: 3, liberated: ["Shusha"] },
    { day: 44, title: "10 Noyabr 2020", text: "Zəfər Bəyanatı imzalandı. Müharibə başa çatdı!", cameraIndex: 3, liberated: ["Lachin", "Kalbajar", "Aghdam"] }
];

let currentDayIndex = 0;

// ==========================================
// 4. .GLB MODELLƏRİNİN YÜKLƏNMƏSİ
// ==========================================
const loader = new THREE.GLTFLoader();

// Azerbaijan GLB yükle
loader.load('azerbaijan.glb', (gltf) => {
    azerbaijanModel = gltf.scene;
    scene.add(azerbaijanModel);

    // 1. GLB İçindeki Kameraları Al
    if (gltf.cameras && gltf.cameras.length > 0) {
        gltf.cameras.forEach((cam) => {
            cam.aspect = container.clientWidth / container.clientHeight;
            cam.updateProjectionMatrix();
            scene.add(cam);
            loadedCameras.push(cam);
        });
        
        // İlk kameraya geçiş yap
        switchCamera(0);
    }

    // 2. GLB İçindeki Bölgeleri (Mesh) Tara ve Sakla
    azerbaijanModel.traverse((child) => {
        if (child.isMesh) {
            regionsList.push(child);
            regionsMap[child.name] = child; // Mesh adına göre kaydet
            
            // Başlangıçta hepsini işgal altında (kırmızı) veya orijinal renkte yap
            child.userData.originalColor = COLORS.isgal;
            child.material.color.setHex(COLORS.isgal);
        }
    });

    console.log("Yüklenen Bölge Sayısı:", regionsList.length);
    console.log("Yüklenen Kamera Sayısı:", loadedCameras.length);

    // İlk günün durumunu yükle
    updateTimeline(0);

}, undefined, (error) => {
    console.error('azerbaijan.glb yüklenirken hata oluştu:', error);
});

// Armenia GLB yükle
loader.load('armenia.glb', (gltf) => {
    armeniaModel = gltf.scene;
    scene.add(armeniaModel);
}, undefined, (error) => {
    console.error('armenia.glb yüklenirken hata oluştu:', error);
});

// ==========================================
// 5. KAMERA DƏYİŞDİRMƏ VƏ GÜN İDARƏSİ
// ==========================================
function switchCamera(index) {
    if (loadedCameras[index]) {
        currentCamera = loadedCameras[index];
    } else {
        currentCamera = scene.children.find(c => c.isPerspectiveCamera) || currentCamera;
    }
    controls.object = currentCamera;
}

function updateTimeline(dayIndex) {
    currentDayIndex = dayIndex;
    const data = daysData[dayIndex] || daysData[daysData.length - 1];

    // HTML Metinlerini Güncelle
    document.getElementById('tl-day').innerText = data.title;
    document.getElementById('tl-text').innerText = data.text;
    document.getElementById('tl-range').value = dayIndex;

    // Kamerayı Değiştir (Eğer tanımlı kamera varsa)
    if (data.cameraIndex !== undefined) {
        switchCamera(data.cameraIndex);
    }

    // Haritadaki Bölgelerin Rengini Güncelle
    data.liberated.forEach((regionName) => {
        if (regionsMap[regionName]) {
            regionsMap[regionName].material.color.setHex(COLORS.azad);
            regionsMap[regionName].userData.originalColor = COLORS.azad;
        }
    });
}

// ==========================================
// 6. FARE İLƏ BÖLGƏ SEÇMƏ (RAYCASTER)
// ==========================================
window.addEventListener('click', onRegionClick, false);

function onRegionClick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, currentCamera);
    const intersects = raycaster.intersectObjects(regionsList, true);

    if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;

        // Önceki seçili bölgeyi eski rengine döndür
        if (selectedRegion && selectedRegion !== clickedMesh) {
            selectedRegion.material.color.setHex(selectedRegion.userData.originalColor);
        }

        // Seçilen bölgeyi işaretle (Sarı yap)
        selectedRegion = clickedMesh;
        selectedRegion.material.color.setHex(COLORS.selected);

        // Bilgi panelinde göster
        document.getElementById('tl-text').innerText = "Seçilən Bölge: " + selectedRegion.name;
    }
}

// ==========================================
// 7. BUTONLAR VƏ RANGE INPUT İDARƏSİ
// ==========================================
const rangeInput = document.getElementById('tl-range');
const prevBtn = document.getElementById('tl-prev');
const nextBtn = document.getElementById('tl-next');
const playBtn = document.getElementById('tl-play');

let isPlaying = false;
let playInterval = null;

if (rangeInput) {
    rangeInput.addEventListener('input', (e) => {
        updateTimeline(parseInt(e.target.value));
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (currentDayIndex < daysData.length - 1) {
            updateTimeline(currentDayIndex + 1);
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentDayIndex > 0) {
            updateTimeline(currentDayIndex - 1);
        }
    });
}

if (playBtn) {
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playBtn.innerText = isPlaying ? "Dayandır" : "Başlat";

        if (isPlaying) {
            const speed = parseInt(document.getElementById('tl-speed').value) || 800;
            playInterval = setInterval(() => {
                if (currentDayIndex < daysData.length - 1) {
                    updateTimeline(currentDayIndex + 1);
                } else {
                    clearInterval(playInterval);
                    isPlaying = false;
                    playBtn.innerText = "Başlat";
                }
            }, speed);
        } else {
            clearInterval(playInterval);
        }
    });
}

// ==========================================
// 8. RENDER DÖNGÜSÜ
// ==========================================
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, currentCamera);
}
animate();

// Ekran boyutlandırma
window.addEventListener('resize', () => {
    currentCamera.aspect = container.clientWidth / container.clientHeight;
    currentCamera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
