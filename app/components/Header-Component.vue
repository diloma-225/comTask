<template>
  <header class="bg-white border-b border-gray-200 px-8 py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
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
        <h1 class="text-3xl font-bold cursor-pointer" @click="router.push('/')">
          Com <span class="text-primary">Task</span>
        </h1>
      </div>
      <div class="flex items-center gap-4">
        <Popover>
          <PopoverTrigger>
            <button
              class="w-12 h-12 bg-orange-400 rounded-full p-3 flex items-center justify-center hover:bg-orange-500 cursor-pointer"
            >
              <img src="/profile.svg" alt="Avatar" class="w-8 h-8" />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">Profil</h3>
              <p class="text-sm text-gray-600 mb-4">
                Gérer votre compte et vos paramètres
              </p>
              <button
                class="w-full mb-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 cursor-pointer"
              >
                Paramètres du compte
              </button>

              <button
                class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 cursor-pointer"
                @click="logout()"
              >
                <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLogout" />
                Déconnexion
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Loader2 } from "lucide-vue-next";

const router = useRouter();

const user = useUser();
const isLogout = ref(false);

async function logout() {
  isLogout.value = true;
  await user.logout();
  isLogout.value = false;
}
</script>

<style scoped></style>
