<template>
  <div>
    <HeaderComponent />
    <div class="my-5 w-5/6 mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink class="cursor-pointer" @click.prevent="router.back()">
              <span class="text-lg underline">Retour</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div class="flex pt-6">
      <!-- Sidebar -->
      <TaskAside
        @update:asignTo="handleServiceSelection"
        @update:date="handleDateChange"
      />

      <!-- Main Content -->
      <main class="flex-1 px-8">
        <div
          class="bg-red-200 text-red-700 text-xs block my-2 p-3 rounded"
          v-if="errorMessage"
        >
          {{ errorMessage }}
        </div>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 h-full p-5">
          <div class="mb-5">
            <Input placeholder="Titre de la tache" v-model="form.title" class="p-5" />
          </div>

          <div class="mb-5">
            <Textarea
              placeholder="Description de la tache"
              v-model="form.description"
              class="p-5 h-48"
            />
          </div>
          <div>
            <Button
              class="p-5 cursor-pointer flex items-center justify-center"
              @click="handleCreateTask"
            >
              <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
              Ajouter la tâche
            </Button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Slash } from "lucide-vue-next";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Loader2 } from "lucide-vue-next";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const router = useRouter();
const route = useRoute();
const isLoading = ref(false);

const form = ref({
  date_fin: null,
  service_id: null,
  title: null,
  description: null,
});

const handleServiceSelection = (service) => {
  form.value.service_id = service.id;
};
const handleDateChange = (date) => {
  form.value.date_fin = date;
};

const formatToTimestamp = (dateObj) => {
  return new Date(dateObj.year, dateObj.month - 1, dateObj.day);
};
const supabase = useSupabaseClient();
const errorMessage = ref(null);

const handleCreateTask = async () => {
  isLoading.value = true;
  if (!form.value.title || form.value.title.trim() === "") {
    errorMessage.value = "Le titre est obligatoire.";
    isLoading.value = false;
    return;
  }
  if (!form.value.service_id) {
    errorMessage.value = "Selectionnez un service";
    isLoading.value = false;
    return;
  }

  const { data, error } = await supabase
    .from("Tasks")
    .insert([
      {
        title: form.value.title,
        description: form.value.description,
        statut: 0,
        date_echeance: form.value.date_fin
          ? formatToTimestamp(form.value.date_fin)
          : null,
        project_id: route.params.id,
        assign_to: form.value.service_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    isLoading.value = false;
    return;
  }

  isLoading.value = false;
  router.push(`/project-view/${route.params.id}`);
  Toastify({
    text: "Tache ajoutée avec succès !",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "oklch(62.7% 0.194 149.214)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};
</script>

<style scoped></style>
