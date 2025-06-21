require('dotenv').config();
const admin = require('firebase-admin');

// Ortam değişkenlerinden Firebase bilgilerini al
const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const projects = [{
        title: "Eventura",
        description: "Etkinlik sitesi",
        coverImageUrl: "https://media.licdn.com/dms/image/v2/D4D22AQH1mOf3ErhFcg/feedshare-shrink_2048_1536/B4DZRbNPAAHIAo-/0/1736696987062?e=1753315200&v=beta&t=VLxoBD3HhWYR70N9Bw-fwYLAVao7WETdKV8AQnh6scE",
        githubUrl: "https://github.com/eylemseyhan/Eventura",
        images: [
            { url: "https://media.licdn.com/dms/image/v2/D4D22AQEqvizL3f0rkw/feedshare-shrink_2048_1536/B4DZRbNPAZHYAo-/0/1736696988147?e=1753315200&v=beta&t=rI86zLG5DLUV6nGfecuK5R11uL3Zx3CBJEG3EFmrYvw" },
            { url: "https://media.licdn.com/dms/image/v2/D4D22AQFRxo_JcyRAMA/feedshare-shrink_2048_1536/B4DZRbNPAWHYAo-/0/1736696987220?e=1753315200&v=beta&t=MLXa4Eueh_FJpgiI37jaXwzZDlkMBUOC2QW74XnCNeI" },
            { url: "https://media.licdn.com/dms/image/v2/D4D22AQHUklGciv2pEg/feedshare-shrink_2048_1536/B4DZRbNPAjHYAo-/0/1736696984924?e=1753315200&v=beta&t=aW3U1UbvhrUU256Fw5sXY0TZgpZraeaCBKA5TQ0Gs-I" },
            { url: "https://media.licdn.com/dms/image/v2/D4D22AQEIeE3pzOVvtA/feedshare-shrink_2048_1536/B4DZRbNPALG4Ao-/0/1736696984934?e=1753315200&v=beta&t=j_19kqZcrEAQO8bsL2kw3ccvmRsgE6G8Ci3qlE0vWQk" }
        ],
        technologies: [".NET Core", "Bootstrap", "PostgreSQL", "Aiven", "jQuery"],
        order: 1
    },
    {
        title: "Taskify",
        description: "Kullanıcıların görevlerini yönetmesine ve takip etmesine yardımcı olan bir görev yönetim uygulamasıdır.",
        coverImageUrl: "https://i.imgur.com/N2Xz5Du.png",
        githubUrl: "https://github.com/eylemseyhan/Taskify",
        images: [
            { url: "https://i.imgur.com/FnRMsq1.png" },
            { url: "https://i.imgur.com/V8nXDCu.png" },
            { url: "https://i.imgur.com/nYXAsve.png" },
            { url: "https://i.imgur.com/nYXAsve.png" },
            { url: "https://i.imgur.com/9Lxy1LG.png" }
        ],
        technologies: ["React", "Firebase", "Ant Design"],
        order: 2
    },
    {
        title: "NutriTrack",
        description: "Kullanıcıların günlük öğünlerini takip edebileceği, öğünlere özel yemek ekleyebileceği ve sağlıklı beslenme alışkanlıkları kazanmasına yardımcı olan bir mobil diyet takip uygulamasıdır.",
        coverImageUrl: "https://media.licdn.com/dms/image/v2/D4D22AQHcOyXt9MsjZw/feedshare-shrink_800/B4DZb.Z5MEGkAk-/0/1748024929100?e=1753315200&v=beta&t=XuKrJCz4YU3PjhRJVFWwzMdQbEdQ7jWeCL9d40uyZPM",
        githubUrl: "https://github.com/eylemseyhan/NutriTrack",
        images: [
            { url: "https://media.licdn.com/dms/image/v2/D4D22AQHcOyXt9MsjZw/feedshare-shrink_800/B4DZb.Z5MEGkAk-/0/1748024929100?e=1753315200&v=beta&t=XuKrJCz4YU3PjhRJVFWwzMdQbEdQ7jWeCL9d40uyZPM" },
            { url: "https://media.licdn.com/dms/image/v2/D4D22AQFPzI0lPZ-xjw/feedshare-shrink_1280/B4DZb.Z5MVHEAk-/0/1748024928041?e=1753315200&v=beta&t=lUuD-PJIb2aIOTONhe6ZJv4wVb-DiTT4zDWQC-jwaU0" },
            { url: "https://media.licdn.com/dms/image/v2/D4D22AQHCgm15uTj2ag/feedshare-shrink_1280/B4DZb.Z5MgIEAo-/0/1748024929858?e=1753315200&v=beta&t=VkMyZO56ACcPKAaF9LDgXv4LG64-WsHYMGKr95R5gdU" },
            { url: "https://media.licdn.com/dms/image/v2/D4D22AQHVvOQJHILCqA/feedshare-shrink_1280/B4DZb.Z5MXHsAk-/0/1748024929945?e=1753315200&v=beta&t=jYjM33vP0jcHqrEXwg-vrSj_d9KfH-pef7PhkcvfkD0" },
            { url: "https://media.licdn.com/dms/image/v2/D4D22AQHmZWeHqhnq_w/feedshare-shrink_800/B4DZb.Z5MVHsAk-/0/1748024929991?e=1753315200&v=beta&t=OihWmMPSwMySDOrT_Lsv-0VTYroBvsnfZue1e6XICkI" },
            { url: "https://media.licdn.com/dms/image/v2/D4D22AQG0lM93tl006g/feedshare-shrink_800/B4DZb.Z5MuHEAg-/0/1748024929857?e=1753315200&v=beta&t=fNg4h6DQfqpWWEu4w3za51ZPpTFa3A2zxIZObLxpwB0" }
        ],
        technologies: ["Swift (UIKit & Storyboard)", "Firebase Authentication", "Firebase Firestore", "CocoaPods"],
        order: 3
    }

    // Buraya istediğin kadar proje ekleyebilirsin
];

async function addProjects() {
    for (const project of projects) {
        await db.collection('projects').add(project);
        console.log(`${project.title} eklendi.`);
    }
    console.log('Tüm projeler başarıyla eklendi!');
    process.exit(0);
}

addProjects();