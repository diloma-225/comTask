<template>
  <!-- Sidebar -->
  <aside class="w-96 px-6 space-y-4" v-if="fetchingProject">
    <!-- User Card -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <p class="text-sm text-gray-500 mb-2">Créé par</p>
      <div class="flex items-center gap-3">
        <div
          class="w-12 h-12 bg-green-100 rounded-full border-2 border-green-600 flex items-center justify-center"
        >
          <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-gray-600">{{ project.profil.email }}</p>
          <p class="font-semibold italic text-gray-900">
            {{ project.profil.name }}
          </p>
        </div>
      </div>
    </div>

    <!-- Project Card -->
    <div class="bg-white relative rounded-xl p-6 shadow-sm border border-gray-100">
      <ProjectsEdit @project-updated="handleProjectUpdated" :project="project" />

      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <svg
            class="w-6 h-6 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975V9.25H21.9531C21.8809 8.20117 21.6973 7.51276 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839ZM21.9978 10.75H2V14C2 17.7712 2 19.6569 3.17157 20.8284C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14V11.7979C22 11.4227 21.9978 10.75 21.9978 10.75Z"
                fill="#269310"
              ></path>
            </g>
          </svg>
        </div>
        <h2 class="font-semibold text-gray-900">{{ project.title }}</h2>
      </div>
      <p class="text-sm text-gray-600 leading-relaxed">
        {{ project.description }}
      </p>
    </div>

    <!-- Stats -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-600">Services</span>
          <span class="text-sm font-semibold text-gray-900">{{ nb_services }}</span>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-600">À faire</span>
          <span class="text-sm font-semibold text-gray-900">{{
            task.countTasks(project, 0)
          }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-red-700 h-2 rounded-full"
            :style="{ width: task.getProgress(project, 0) + '%' }"
          ></div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-600">En cours</span>
          <span class="text-sm font-semibold text-gray-900">{{
            task.countTasks(project, 2)
          }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-yellow-700 h-2 rounded-full"
            :style="{ width: task.getProgress(project, 2) + '%' }"
          ></div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-600">Terminée(s)</span>
          <span class="text-sm font-semibold text-gray-900">{{
            task.countTasks(project, 1)
          }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-green-700 h-2 rounded-full"
            :style="{ width: task.getProgress(project, 1) + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </aside>
  <aside class="w-96 px-6 space-y-4" v-else>
    <div class="animate-pulse space-y-4">
      <div class="bg-gray-200 rounded-xl p-6 h-32"></div>
      <div class="bg-gray-200 rounded-xl p-6 h-48"></div>
      <div class="bg-gray-200 rounded-xl p-6 h-40"></div>
    </div>
  </aside>
</template>

<script setup>
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
const props = defineProps({
  projectId: {
    type: Number,
    required: true,
  },
  refreshKey: Number,
});

const supabase = useSupabaseClient();
const task = useTask();
const project = ref(null);

const nb_services = ref(0);

const fetchingProject = ref(false);

const fetchProject = async () => {
  const projectId = props.projectId;
  if (!projectId) return;

  const { data, error } = await supabase
    .from("Projects")
    .select("*, Tasks(*), profil(email, name)")
    .eq("id", projectId)
    .single();

  if (error) {
    console.error(error);
  } else {
    project.value = data;
    fetchingProject.value = true;
  }
};

async function handleProjectUpdated() {
  Toastify({
    text: "Projet mis à jour !",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: { background: "oklch(62.7% 0.194 149.214)" },
  }).showToast();
  await fetchProject();
}

watch(
  () => props.refreshKey,
  async () => {
    await fetchProject();
  }
);

onMounted(async () => {
  const { data, error } = await supabase
    .from("project_service_count")
    .select("nb_services_contribuant")
    .eq("project_id", props.projectId)
    .single();

  if (error) {
    return;
  }
  nb_services.value = data.nb_services_contribuant;
  await fetchProject();
});
</script>

<style scoped></style>
