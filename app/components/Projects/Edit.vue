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
import { SquarePen } from "lucide-vue-next";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const isLoading = ref(false);
const isModalOpen = ref(false);
const supabase = useSupabaseClient();

const emits = defineEmits(["projectUpdated"]);

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
    .update({ title: props.project.title, description: props.project.description })
    .eq("id", props.project.id)
    .select();

  if (data) {
    isLoading.value = false;
    isModalOpen.value = false;
    emits("projectUpdated");
  }
}
</script>

<template>
  <Dialog v-model:open="isModalOpen">
    <DialogTrigger as-child>
      <button
        class="absolute right-0 top-0 mb-8 px-6 py-3 text-white rounded-lg font-medium flex items-center gap-2 cursor-pointer"
      >
        <SquarePen class="text-orange-500 cursor-pointer w-5 h-5" />
      </button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Modifier Projet</DialogTitle>
        <DialogDescription>
          Modifiez les informations du projet ci-dessous.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="flex flex-col gap-4">
          <Label for="name" class="text-right"> Titre du Projet </Label>
          <Input v-model="project.title" id="name" class="col-span-3" />
        </div>
        <div class="flex flex-col gap-4">
          <Label for="description" class="text-right"> Description </Label>
          <Textarea v-model="project.description" id="description" class="col-span-3" />
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
