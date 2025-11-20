<template>
  <div v-if="project">
    <HeaderComponent />
    <div class="my-5 w-5/6 mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              class="cursor-pointer"
              @click.prevent="router.push('/dashboard')"
            >
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{{ project.title }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <div class="flex h-auto pt-6 pb-10">
      <!-- Sidebar -->
      <AsideComponent :project-id="project.id" :refresh-key="refreshKey" />

      <!-- Main Content -->
      <main class="flex-1 px-8 pb-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 h-auto">
          <!-- Filter Tabs -->
          <div class="border-b border-gray-200 px-6 py-4">
            <div class="flex items-center gap-3 flex-wrap">
              <button
                class="px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 cursor-pointer"
                :class="
                  activeStatus === null
                    ? 'bg-green-700 hover:bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-700'
                "
                @click="setStatusFilter(null)"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                Tous ({{ project.Tasks.length }})
              </button>
              <button
                class="px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 cursor-pointer"
                :class="
                  activeStatus === 0
                    ? 'bg-green-700 hover:bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-700'
                "
                @click="setStatusFilter(0)"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                  />
                </svg>
                À faire ({{ taskHook.countTasks(project, 0) }})
              </button>
              <button
                class="px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 cursor-pointer"
                :class="
                  activeStatus === 2
                    ? 'bg-green-700 hover:bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-700'
                "
                @click="setStatusFilter(2)"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                En cours ({{ taskHook.countTasks(project, 2) }})
              </button>
              <button
                class="px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 cursor-pointer"
                :class="
                  activeStatus === 1
                    ? 'bg-green-700 hover:bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-700'
                "
                @click="setStatusFilter(1)"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Terminés ({{ taskHook.countTasks(project, 1) }})
              </button>
            </div>
          </div>

          <!-- New Task Button -->
          <div class="px-6 py-4 border-b border-gray-200">
            <button
              class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-50 cursor-pointer"
              @click="router.push(`/new-task/${route.params.id}`)"
            >
              Nouvelle tâche
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <!-- Table Header -->
          <div
            class="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600"
          >
            <div class="col-span-5">Titre</div>
            <div class="col-span-3">Assigné à</div>
            <div class="col-span-2">À livré le</div>
            <div class="col-span-2">Actions</div>
          </div>

          <!-- Task List -->
          <div
            class="divide-y divide-gray-100"
            v-if="filteredTasks && filteredTasks.length > 0"
          >
            <!-- Task -->
            <div
              class="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 cursor-pointer"
              @click="router.push(`/task-view/${task.id}`)"
              v-for="(task, index) in filteredTasks"
            >
              <div class="col-span-5 flex items-center gap-3">
                <span class="text-gray-400 font-medium">{{
                  (page - 1) * pageSize + index + 1
                }}</span>
                <div>
                  <span
                    :class="[
                      'inline-block px-2 py-1 text-xs font-medium rounded mb-1',
                      taskHook.getTaskStatus(task) === 'À faire'
                        ? 'bg-red-100 text-red-700'
                        : taskHook.getTaskStatus(task) === 'En cours'
                        ? 'bg-yellow-100 text-yellow-700'
                        : taskHook.getTaskStatus(task) === 'Terminée'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700',
                    ]"
                    >{{ taskHook.getTaskStatus(task) }}</span
                  >
                  <p class="font-medium text-gray-900">{{ task.title }}</p>
                </div>
              </div>
              <div class="col-span-3 flex flex-col gap-2">
                <p>{{ task.services.title }}</p>
                <div>
                  <!-- Groupe d'avatars -->
                  <div
                    class="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale"
                  >
                    <Avatar v-for="profil in task.services.profil">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
              <div class="col-span-2">
                <p class="text-sm text-gray-600">{{ task.date_echeance }}</p>
              </div>
              <div class="col-span-2 flex items-center gap-2">
                <Popover
                  :open="popoverOpen[task.id]"
                  @update:open="handlePopoverOpen($event, task.id)"
                >
                  <PopoverTrigger @click.stop>
                    <button
                      class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-green-700"
                    >
                      Plus
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Select
                      @update:model-value="handleStatutChange($event, task.id)"
                      v-model="task.statut"
                    >
                      <SelectTrigger class="w-[180px]">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Statut</SelectLabel>
                          <SelectItem :value="0"> À faire </SelectItem>
                          <SelectItem :value="2"> En cours </SelectItem>
                          <SelectItem :value="1"> Terminé </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </PopoverContent>
                </Popover>
                <DeleteTaskAlertComponent
                  @task-deleted="handleTaskDeleted"
                  :id="task.id"
                />
              </div>
            </div>
          </div>
          <div class="divide-y divide-gray-100" v-else>
            <p class="p-6 text-center text-gray-500">Aucune tâche trouvée.</p>
          </div>
        </div>
        <div class="mt-3 gap-4 flex">
          <button
            class="p-3 bg-gray-700 text-gray-200 rounded"
            :class="{
              'opacity-80 cursor-not-allowed': page === 1,
              'cursor-pointer': page > 1,
            }"
            :disabled="page === 1"
            @click="prevPage"
          >
            Précédent
          </button>
          <button
            class="p-3 bg-gray-700 text-gray-200 rounded"
            :class="{
              'opacity-80 cursor-not-allowed': filteredTasks.length < pageSize,
              'cursor-pointer': filteredTasks.length >= pageSize,
            }"
            :disabled="filteredTasks.length < pageSize"
            @click="nextPage"
          >
            Suivant
          </button>
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

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Slash } from "lucide-vue-next";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const router = useRouter();
const route = useRoute();

const taskHook = useTask();

const supabase = useSupabaseClient();
const project = ref(null);
const allTasks = ref([]); // toutes les tâches du projet
const filteredTasks = ref([]); // tâches filtrées + pagination
const refreshKey = ref(0);

const page = ref(1);
const pageSize = 5;
const activeStatus = ref(null); // null = toutes les tâches

const popoverOpen = ref({});

const handlePopoverOpen = (newVal, taskId) => {
  popoverOpen.value[taskId] = newVal;
};

// Fonction unique pour fetch le projet et toutes les tâches
const fetchTasks = async () => {
  const projectId = route.params.id;
  if (!projectId) return;

  const { data, error } = await supabase
    .from("Projects")
    .select("*, Tasks(*, services(title, profil(name, email))), profil(email, name)")
    .eq("id", projectId)
    .order("created_at", { ascending: false, foreignTable: "Tasks" })
    .single();

  if (error) {
    console.error(error);
    return;
  }

  project.value = data;
  allTasks.value = data.Tasks;
  applyFilter();
};

const handleTaskDeleted = async () => {
  await fetchTasks();
  refreshKey.value++; // Force la réactivité côté AsideComponent
};

// Appliquer le filtre + pagination
const applyFilter = () => {
  let tasks = allTasks.value;

  if (activeStatus.value !== null) {
    tasks = tasks.filter((t) => t.statut === activeStatus.value);
  }

  const from = (page.value - 1) * pageSize;
  const to = from + pageSize;

  filteredTasks.value = tasks.slice(from, to);
};

// Changer de page
const prevPage = () => {
  if (page.value > 1) page.value--;
};
const nextPage = () => {
  page.value++;
};

// Watchers pour re-appliquer le filtre quand page ou statut change
watch([page, activeStatus], applyFilter);

// Changer de filtre
const setStatusFilter = (status) => {
  activeStatus.value = status; // 0,1,2 ou null pour "Tous"
  page.value = 1; // reset pagination
};

// Mise à jour du statut d'une tâche
const handleStatutChange = async (newStatut, taskId) => {
  const { error } = await supabase
    .from("Tasks")
    .update({ statut: newStatut })
    .eq("id", taskId);

  if (error) {
    console.error("Erreur lors de la mise à jour du statut de la tâche", error);
    return;
  }

  popoverOpen.value[taskId] = false;
  refreshKey.value++;
  Toastify({
    text: "Statut de la tâche mis à jour avec succès !",
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: { background: "oklch(62.7% 0.194 149.214)" },
  }).showToast();

  // Recharger les tâches après modification
  fetchTasks();
};

onMounted(fetchTasks);
</script>

<style scoped></style>
