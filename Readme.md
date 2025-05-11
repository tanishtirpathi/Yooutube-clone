<h1 align="center" style="font-size: 2.5rem;">🎬 YouTube Clone - Backend API</h1>

<p align="center" style="font-size: 1.1rem;">
  A full-fledged backend built with ❤️ by <b>Tanish Tirpathi</b> while learning modern web development.
</p>

<p align="center">
  <a href="https://github.com/tanishtirpathi" target="_blank"><img src="https://img.shields.io/badge/GitHub-Tanish_Tirpathi-blue?style=for-the-badge&logo=github"></a>
  <a href="https://www.instagram.com/tanish.tirpathi" target="_blank"><img src="https://img.shields.io/badge/Instagram-@tanish.tirpathi-E4405F?style=for-the-badge&logo=instagram&logoColor=white"></a>
  <a href="https://www.linkedin.com/in/tanishtirpathi" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-Tanish_Tirpathi-0077B5?style=for-the-badge&logo=linkedin"></a>
</p>

<hr />

<h2>🚀 Tech Stack</h2>
<ul>
  <li><b>Runtime:</b> Node.js</li>
  <li><b>Framework:</b> Express.js</li>
  <li><b>Database:</b> MongoDB + Mongoose</li>
  <li><b>Auth:</b> JWT, Bcrypt</li>
  <li><b>Cloud:</b> Cloudinary for video/image storage</li>
  <li><b>Middleware:</b> Multer, CORS, Cookie-parser</li>
</ul>

<h2>📦 Install & Run</h2>
<pre><code>// Clone the project
git clone https://github.com/tanishtirpathi/yooutube-clone

// Navigate to project directory
cd youtube-clone

// Install dependencies
npm install

// Run the development server
npm run dev
</code></pre>

<h2>🧠 Folder Structure</h2>
<pre>
📦 src/
 ┣ 📂controllers/
 ┃ ┗ 📜 user.controllers.js
 ┣ 📂db/
 ┃ ┗ 📜 index.js
 ┣ 📂middlewares/
 ┃ ┣ 📜 auth.middleware.js
 ┃ ┗ 📜 multer.middleware.js
 ┣ 📂modals/
 ┃ ┣ 📜 user.modal.js
 ┃ ┗ 📜 video.modal.js
 ┣ 📂routes/
 ┃ ┗ 📜 user.routes.js
 ┣ 📂utils/
 ┃ ┣ 📜 APIerror.js
 ┃ ┣ 📜 APIresp.js
 ┃ ┣ 📜 AsyncHandler.js
 ┃ ┣ 📜 cloudinary.js
 ┃ ┣ 📜 app.js
 ┃ ┣ 📜 constants.js
 ┃ ┗ 📜 index.js
 ┗ 📜 index.js
</pre>

<h2>🧪 Environment</h2>
Create a <code>.env</code> file based on <code>.env.sample</code>. Include:
<ul>
  <li>MONGO_URI</li>
  <li>CLOUDINARY_CLOUD_NAME</li>
  <li>CLOUDINARY_API_KEY</li>
  <li>CLOUDINARY_API_SECRET</li>
  <li>JWT_SECRET</li>
</ul>

<h2>⚠️ Notes</h2>
<ul>
  <li>There’s a duplicate dependency "<code>brcypt</code>" that seems to be a typo. You should remove it and keep only <code>bcrypt</code>.</li>
</ul>

<h2>📬 Contact</h2>
<p>DM me on Instagram or reach out via LinkedIn for collabs, suggestions, or just to say hi 😎</p>

<hr />
<p align="center" style="font-weight: bold;">🔥 Part of my <span style="color: #ff6347;">#StarkBuilderSystem</span> 🔥</p>
