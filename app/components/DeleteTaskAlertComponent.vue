<template>
  <AlertDialog v-model:open="open">
    <AlertDialogTrigger as-child>
      <button
        class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg cursor-pointer"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Supprimer la tâche</AlertDialogTitle>
        <AlertDialogDescription>
          Cette action est irréversible. Cela supprimera définitivement cette tâche.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="cursor-pointer">Annuler</AlertDialogCancel>
        <button
          class="bg-red-600 text-white hover:bg-red-700 cursor-pointer px-2 rounded-lg flex items-center justify-center"
          @click="handleDeleteTask"
        >
          <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
          Supprimer
        </button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { Loader2 } from "lucide-vue-next";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const isLoading = ref(false);
const supabase = useSupabaseClient();

const emits = defineEmits(["task-deleted"]);
const open = ref(false);

const handleDeleteTask = async () => {
  isLoading.value = true;
  const { error } = await supabase.from("Tasks").delete().eq("id", props.id);

  if (error) {
    isLoading.value = false;
    Toastify({
      text: "Erreur lors de la suppression de la tâche.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#f56565",
    }).showToast();
  } else {
    isLoading.value = false;
    open.value = false;
    emits("task-deleted");
    Toastify({
      text: "Tâche supprimée avec succès.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#48bb78",
    }).showToast();
  }
};
</script>

<style scoped></style>
