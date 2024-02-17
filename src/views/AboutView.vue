<template>
  <section class="bg-white text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto flex flex-col">
      <div class="lg:w-4/6 mx-auto">
        <div class="hidden sm:block rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full"
            src="https://res.cloudinary.com/poliweb/image/upload/c_fill,w_1200/v1640324519/HeaderPortfolio_bjo6uu.webp">
        </div>
        <div class="flex flex-col sm:flex-row mt-10">
          <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
            <div
              class="w-40 h-40 rounded-lg sm:rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
              <img src="https://res.cloudinary.com/poliweb/image/upload/c_fit,w_160/v1639893378/avatar_my_xrxg6d.webp"
                width="160" height="160" alt="Pavel Polistovskiy"
                class="rounded-lg sm:rounded-full inline-flex items-center justify-center">
            </div>
            <div class="flex flex-col items-center text-center justify-center">
              <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">Pavel Polistovskiy</h2>
              <div class="w-12 h-1 bg-pink-600 rounded mt-2 mb-4"></div>
              <p class="text-base mb-4">Web Developer | Frontend Developer | Web Design</p>
              <div class="mx-auto">
                <IconButton />
              </div>
            </div>
          </div>
          <div
            class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
            <div class="">
              <p class="leading-relaxed text-lg mb-4">My competence allows you to start a project with the development of
                a prototype and design in the Figma tool, deploy and code the project in VS Code, as well as use the Git
                version control system for the project. To deploy projects on the Internet, I use Netlify and Heroku
                servers, which allows faster delivery, simplified workflows and easy scaling.</p>
              <p class="leading-relaxed text-lg mb-4"><span class="font-bold">My professional skills:</span> FIGMA, HTML5,
                CSS3, JS, Vue js, Nuxt js, Laravel, GitHub, Netlify, Heroku, Cloudinary Platform. </p>
              <p class="italic mb-2">Think of me as an extension of your team.</p>
              <router-link :to="{ name: 'contact' }" class="text-pink-600 inline-flex items-center">Hire Me
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </router-link>
            </div>
            <div class="">
              <h3 class="text-2xl font-bold mt-8">Resume (CV)</h3>
              <div class="mb-4">
                <h4 class="text-lg my-2 font-bold">1. Contact Information</h4>
                <ul class="list-disc list-inside">
                  <li v-for="(item, index) in contact" :key="index">
                    <span class="font-bold pr-2">{{ item.item }}:</span> <span v-html="item.title"></span>
                  </li>
                </ul>
              </div>
              <div class="mb-4">
                <h4 class="text-lg my-2 font-bold">2. Professional Status</h4>
                <ul class="list-disc list-inside">
                  <li>
                    Web Developer (Full-stack Developer), Web Design.
                  </li>
                </ul>
              </div>
              <div class="mb-4">
                <h4 class="text-lg my-2 font-bold">3. Summary</h4>
                <ul class="">
                  <li>
                    Hello, my name is Pavel Polistovsky, and I am a web developer from Kazakhstan 🇰🇿 with over fifteen years of experience. I am inspired by the constant evolution of IT technologies and strive for excellence in web development. My key skills include HTML5, CSS3, JavaScript, PHP, along with experience with Laravel, Vue.js, and Nuxt.js frameworks. My approach is based on the Jamstack methodology, aiming to create outstanding websites and web applications. My goal is to continue learning, immerse myself in projects, and achieve a high level of mastery in web development.
                  </li>
                </ul>
              </div>
              <div class="mb-4">
                <h4 class="text-lg my-2 font-bold">4. Skills</h4>
                <ul class="list-disc list-inside">
                  <li v-for="(item, index) in skills" :key="index">
                    <span class="font-bold pr-2">{{ item.item }}:</span> <span v-html="item.title"></span>
                  </li>
                </ul>
              </div>
              <div class="mb-4">
                <h4 class="text-lg my-2 font-bold">5. Work Experience</h4>
                <ul class="list-disc list-inside">
                  <li v-for="(item, index) in experience" :key="index">
                    <span class="font-bold pr-2">{{ item.item }}:</span> <span v-html="item.title"></span>
                  </li>
                </ul>
              </div>
              <div class="mb-4">
                <h4 class="text-lg my-2 font-bold">6. Projects</h4>
                <ul class="">
                  <li>
                    Highlight key projects with technologies used, project goals, and your contributions.
                  </li>
                </ul>
              </div>
              <div class="mb-4">
                <h4 class="text-lg my-2 font-bold">7.  Education and Certifications</h4>
                <h5 class="font-bold">High Tech for Human Almty: </h5>
                <ul class="list-disc list-inside mb-2">
                  <li>
                    Specialist in high technologies, "PHP Programming" - 2008
                  </li>
                </ul>
                <h5 class="font-bold">Additional courses and certificates:</h5>
                <p class="">1. Master JavaScript Animation with Greensock</p>
                <ul class="list-disc list-inside mb-2">
                  <li>
                    Completion Date: 07.01.2023
                  </li>
                  <li>
                    Instructor: Enzo Ustaris at Demes
                  </li>
                  <li>
                    <a href="https://www.udemy.com/certificate/UC-acd51752-6eca-4856-8310-e023582f1440/" target="_blank" rel="noreferrer" aria-label="Follow me on Linkedin" class="text-pink-600 hover:text-pink-500 ">
                      Certificate received
                    </a>
                  </li>
                </ul>
                <p class="">2. Vue JS 3: Composition API (with Pinia, Firebase 9 & Vite):</p>
                <ul class="list-disc list-inside mb-2">
                  <li>
                    Completion Date: 04.07.2022
                  </li>
                  <li>
                    Instructor: Danny Connell
                  </li>
                  <li>
                    <a href="https://www.udemy.com/certificate/UC-d3e0a10c-eb61-4f91-8a99-5a0a2c6dc4ef/" target="_blank" rel="noreferrer" aria-label="Follow me on Linkedin" class="text-pink-600 hover:text-pink-500 ">
                      Certificate received
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import IconButton from "../components/IconButton.vue";
export default {
  components: {
    IconButton,
  },
};
</script>
<script setup>
import { ref } from 'vue'

const  contact = ref([
  {
    item: 'Full Name',
    title: 'Pavel Polistovsky',
  },
  {
    item: 'Phone Number',
    title: '+7 701 721 1284',
  },
  {
    item: 'Email Address',
    title: 'web✉️poliweb.su',
  },
  {
    item: 'GitHub',
    title: `<a href="https://github.com/poliweb" target="_blank" rel="noreferrer" aria-label="Follow me on Github" class="text-pink-600 hover:text-pink-500 ">PoliWeb</a>`,
  },
  {
    item: 'Linkedin',
    title: `<a href="https://www.linkedin.com/in/poliweb/" target="_blank" rel="noreferrer" aria-label="Follow me on Linkedin" class="text-pink-600 hover:text-pink-500 ">PoliWeb</a>`,
  }
])

const skills = ref([
  {
    item: 'Front-end technologies',
    title: 'HTML5, CSS3, JavaScript',
  },
  {
    item: 'Frameworks',
    title: 'Vue.js, Nuxt.js, Laravel',
  },
  {
    item: 'Design and prototyping',
    title: 'Figma, Pixso',
  },
  {
    item: 'Version control systems',
    title: 'GitHub, GitLab, Bitbucket',
  },
  {
    item: 'Server-side technologies',
    title: 'Laravel',
  },
  {
    item: 'Database',
    title: 'MySQL, PostgreSQL',
  },
  {
    item: 'Cloud platforms',
    title: 'Netlify, Heroku, Vercel, AWS',
  },
  {
    item: 'Resource management',
    title: 'Cloudinary, Firebase Platform',
  },
  {
    item: 'Development methodology',
    title: 'Jamstack',
  },
])

const experience = ref([
  {
    item: 'PoliWeb Web Studio',
    title: 'Founder and Web Developer. Duration: 2009 - 2019',
  },
  {
    item: 'Edgestile',
    title: 'Regional business partner for promoting CMS SiteEdit in Kazakhstan. Website development, client servicing, CMS SiteEdit consulting. Duration: 2010 - 2020',
  },
  {
    item: 'Outsourcing',
    title: 'Frontend Development and Backend Development. Duration: 2019 - 2022',
  },
  {
    item: 'ATHENA PLUS Web Studio',
    title: 'Lead Web Developer, projects on Vue.js, Nuxt.js, and PHP. Duration: 05.12.2022 - Present',
  },
])
</script>
<style></style>
