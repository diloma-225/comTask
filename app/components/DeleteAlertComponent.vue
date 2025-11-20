<template>
  <AlertDialog v-model:open="isOpen">
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
        <AlertDialogTitle>Supprimer ce projet</AlertDialogTitle>
        <AlertDialogDescription>
          Cette action est irréversible. Cela supprimera définitivement ce projet.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="cursor-pointer">Annuler</AlertDialogCancel>
        <button
          @click.stop="deleteProject"
          class="bg-red-600 flex items-center justify-center p-1 px-2 rounded-sm text-white hover:bg-red-700 cursor-pointer"
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
import { Loader2 } from "lucide-vue-next";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["projectDeleted"]);

const supabase = useSupabaseClient();

const isOpen = ref(false);
const isLoading = ref(false);

async function deleteProject() {
  isLoading.value = true;
  // Supprimer les tâches liées
  const { error: tasksError } = await supabase
    .from("Tasks")
    .delete()
    .eq("project_id", props.project.id);

  if (tasksError) {
    console.error("Erreur lors de la suppression des tâches", tasksError);
    return;
  }

  // Supprimer le projet
  const { error: projectError } = await supabase
    .from("Projects")
    .delete()
    .eq("id", props.project.id);

  if (projectError) {
    console.error("Erreur lors de la suppression du projet", projectError);
  }

  isOpen.value = false;
  isLoading.value = false;
  emits("projectDeleted");
}
</script>

<style scoped></style>
