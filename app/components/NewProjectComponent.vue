<script setup>
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-vue-next";

const form = {
  title: null,
  description: null,
};
const isLoading = ref(false);
const isModalOpen = ref(false);
const supabase = useSupabaseClient();

const emits = defineEmits(["projectCreated"]);

async function submitForm() {
  isLoading.value = true;
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Aucun utilisateur connecté", userError);
    return;
  }

  const { data, error } = await supabase
    .from("Projects")
    .insert([
      {
        title: form.title,
        description: form.description,
        created_at: new Date(),
        updated_at: new Date(),
        statut: 1,
        user_id: user.id,
      },
    ])
    .select();

  if (data) {
    isLoading.value = false;
    isModalOpen.value = false;
    form.title = null;
    form.description = null;
    emits("projectCreated");
  }
}
</script>

<template>
  <Dialog v-model:open="isModalOpen">
    <DialogTrigger as-child>
      <button
        class="mb-8 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2 cursor-pointer"
      >
        <span>Nouveau Projet</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Nouveau Projet</DialogTitle>
        <DialogDescription>
          Créez un nouveau projet en remplissant les informations ci-dessous.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="flex flex-col gap-4">
          <Label for="name" class="text-right"> Titre du Projet </Label>
          <Input v-model="form.title" id="name" class="col-span-3" />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="description" class="text-right"> Description </Label>
          <Textarea v-model="form.description" id="description" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" class="cursor-pointer" @click="submitForm">
          <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
          Sauvegarder
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
