<template>
  <div>
    <div class="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <!-- Logo & Title -->
      <div class="text-center mb-4">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 class="text-[3rem] font-bold cursor-pointer" @click="router.push('/')">
            Com <span class="text-primary">Task</span>
          </h1>
        </div>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          La solution moderne pour gérer vos projets et collaborer en équipe. Simple,
          puissant et intuitif.
        </p>
      </div>
      <Button class="my-5 cursor-pointer" @click="router.push('/dashboard')"
        >Dashboard</Button
      >

      <!-- Cards Grid -->
      <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <!-- Get Started Card -->
        <div
          class="bg-white rounded-2xl p-8 border-2 border-purple-200 shadow-lg card-hover"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Démarrer rapidement</h3>
              <p class="text-gray-600 mb-4 leading-relaxed">
                Créez votre premier projet en quelques secondes. Ajoutez vos tâches,
                assignez-les à votre équipe et commencez à collaborer immédiatement.
              </p>
              <button
                class="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2 group"
              >
                Créer un projet
                <svg
                  class="w-5 h-5 group-hover:translate-x-1 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Documentation Card -->
        <div
          class="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm card-hover relative overflow-hidden group"
        >
          <div
            class="absolute top-4 right-4 text-gray-300 group-hover:text-purple-300 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
          <div class="flex items-start gap-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Documentation</h3>
              <p class="text-gray-600 leading-relaxed">
                Découvrez toutes les fonctionnalités. Guides complets, tutoriels vidéo et
                exemples pratiques pour maîtriser l'outil.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Collaboration Card -->
        <div
          class="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm card-hover relative overflow-hidden group"
        >
          <div
            class="absolute top-4 right-4 text-gray-300 group-hover:text-purple-300 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
          <div
            class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4"
          >
            <svg
              class="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Collaboration</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            Travaillez en équipe en temps réel. Assignez des tâches, suivez les progrès et
            communiquez efficacement avec vos collaborateurs.
          </p>
        </div>

        <!-- Analytics Card -->
        <div
          class="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm card-hover relative overflow-hidden group"
        >
          <div
            class="absolute top-4 right-4 text-gray-300 group-hover:text-purple-300 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
          <div
            class="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center mb-4"
          >
            <svg
              class="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Statistiques</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            Suivez vos performances avec des tableaux de bord détaillés. Visualisez
            l'avancement de vos projets et identifiez les points d'amélioration.
          </p>
        </div>
      </div>

      <!-- Social Links -->
      <div class="mt-16 flex items-center gap-6">
        <a href="#" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>
        <a href="#" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            />
          </svg>
        </a>
        <a href="#" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            />
          </svg>
        </a>
        <a href="#" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>
        <a href="#" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../components/ui/button/Button.vue";

const router = useRouter();
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.card-hover {
  transition: all 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(124, 58, 237, 0.1),
    0 10px 10px -5px rgba(124, 58, 237, 0.04);
}
</style>
