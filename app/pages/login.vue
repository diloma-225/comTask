<template>
  <main class="w-full min-h-screen flex items-center justify-center px-4">
    <div
      class="w-full md:w-4/6 rounded-lg md:rounded-l-lg h-auto md:h-[85vh] flex flex-col md:flex-row gap-5 bg-white"
    >
      <!-- Section formulaire -->
      <div class="w-full p-5 flex flex-col justify-center items-center">
        <h1 class="text-2xl md:text-3xl font-bold my-2 text-center md:text-left">
          Connexion
        </h1>
        <div class="w-3/6 row flex flex-col gap-2 my-2">
          <Label>Adresse mail</Label>
          <Input
            placeholder="Email"
            v-model="form.email"
            class="focus-visible:ring-transparent"
          ></Input>
          <span class="text-red-500">{{ errorMessage }}</span>
        </div>
        <div class="w-3/6 row flex flex-col gap-2 my-2">
          <Label>Mot de passe</Label>
          <Input
            type="password"
            v-model="form.password"
            placeholder="Mot de passe"
            class="focus-visible:ring-transparent"
          ></Input>
        </div>
        <div class="w-3/6 my-2 flex items-center justify-between">
          <Button class="bg-green-600 hover:bg-green-500 cursor-pointer" @click="login">
            <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
            Connexion
          </Button>
          <nuxt-link to="/forgot-password" class="text-xs underline">
            Mot de passe oublié ?
          </nuxt-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { Loader2 } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
const supabase = useSupabaseClient();

const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const isLoading = ref(false);

const { translateError } = useErrorTranslator();
const errorMessage = ref(null);

const login = async () => {
  isLoading.value = true;
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: form.value.email,
      password: form.value.password,
    });
    if (error) {
      //throw error
      errorMessage.value = translateError(error);
    }

    router.push("/");
  } catch (error) {
    console.error("error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.container {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>
