<template>
  <!-- Header -->
  <HeaderComponent />

  <main class="max-w-7xl mx-auto px-8 py-8">
    <NewProjectComponent @project-created="loadProjects" />

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        v-for="project in projects"
        :key="project.id"
      >
        <div class="flex items-start gap-3 mb-4">
          <div
            class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <svg
              class="w-6 h-6 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975V9.25H21.9531C21.8809 8.20117 21.6973 7.51276 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839ZM21.9978 10.75H2V14C2 17.7712 2 19.6569 3.17157 20.8284C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14V11.7979C22 11.4227 21.9978 10.75 21.9978 10.75Z"
                fill="#269310"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 flex-1">
            {{ project.title }}
          </h3>
        </div>
        <p class="text-md text-gray-600 my-2">Date de fin : {{ project.date_fin }}</p>

        <!-- Progress Bars -->
        <div class="space-y-4 mb-6">
          <!-- À faire -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-600">À faire</span>
              <span class="text-xs font-medium text-gray-500">
                {{ countTasks(project, 0) }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-gray-600 h-2 rounded-full transition-all duration-500"
                :style="{ width: getProgress(project, 0) + '%' }"
              ></div>
            </div>
          </div>

          <!-- En cours -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-600">En cours</span>
              <span class="text-xs font-medium text-gray-500">
                {{ countTasks(project, 2) }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                :style="{ width: getProgress(project, 2) + '%' }"
              ></div>
            </div>
          </div>

          <!-- Terminée(s) -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-600">Terminée(s)</span>
              <span class="text-xs font-medium text-gray-500">
                {{ countTasks(project, 1) }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-green-600 h-2 rounded-full transition-all duration-500"
                :style="{ width: getProgress(project, 1) + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <button
            class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 cursor-pointer"
            @click="router.push(`project-view/${project.id}`)"
          >
            <span
              class="w-5 h-5 bg-white rounded-full flex items-center justify-center text-green-600 text-xs font-bold"
              >{{ project.Tasks?.length || 0 }}</span
            >
            <span>Tâches</span>
          </button>
          <DeleteAlertComponent
            @project-deleted="handleProjectDeleted()"
            :project="project"
          />
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { useToast } from "@/components/ui/toast/use-toast";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const supabase = useSupabaseClient();
const router = useRouter();
const projects = ref([]);
const { toast } = useToast();

// Compte le nombre de tâches par statut
const countTasks = (project, status) => {
  return project.Tasks?.filter((t) => t.statut === status).length || 0;
};

// Calcule le pourcentage par statut
const getProgress = (project, status) => {
  const total = project.Tasks?.length || 0;
  const count = countTasks(project, status);
  return total > 0 ? (count / total) * 100 : 0;
};

const handleProjectDeleted = async () => {
  const { data, error } = await supabase
    .from("Projects") // mets le vrai nom de ta table
    .select("*, Tasks(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  } else {
    projects.value = data;
  }
  Toastify({
    text: "Projet supprimer !",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "oklch(57.7% 0.245 27.325)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};
const loadProjects = async () => {
  const { data, error } = await supabase
    .from("Projects") // mets le vrai nom de ta table
    .select("*, Tasks(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  } else {
    projects.value = data;
  }
  Toastify({
    text: "Projet créer avec succès !",
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
// Chargement des projets + tâches liées
onMounted(async () => {
  const { data, error } = await supabase
    .from("Projects") // mets le vrai nom de ta table
    .select("*, Tasks(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  } else {
    projects.value = data;
  }
});
</script>
