<template>
  <!-- Sidebar -->
  <aside class="w-96 px-6 space-y-4">
    <!-- User Card -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer">
      <div class="flex items-center gap-3">
        <div
          class="w-12 h-12 bg-green-100 rounded-full border-2 border-green-600 flex items-center justify-center"
        >
          <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
        </div>
        <div>
          <Popover v-model:open="isOpen">
            <PopoverTrigger class="text-start cursor-pointer">
              <p class="text-sm text-gray-600">Assigné à</p>
              <p class="font-bold italic text-blue-900">
                {{
                  selectedService
                    ? selectedService.title
                    : "Cliquez pour choisir un service"
                }}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <div
                class="w-full p-3 hover:bg-gray-200 rounded-sm cursor-pointer"
                v-for="service in services"
                @click="selectService(service)"
              >
                {{ service.title }}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2 bg-white rounded-xl p-6">
      <p>A livré</p>
      <date-picker
        :dateEcheance="props.task.date_echeance"
        @selectedDate="handleSelectedDate"
        class="ml-auto"
      />
    </div>
  </aside>
</template>

<script setup>
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const props = defineProps({
  task: Object,
});

const emits = defineEmits(["update:asignTo", "update:date", "dateUpdated"]);

const supabase = useSupabaseClient();

const services = ref(null);

const selectedService = ref(null);
const isOpen = ref(false);

function handleSelectedDate(date) {
  emits("update:date", date);
}
/* watch(selectedDate, (newDate) => {
  console.log("Aside" + newDate);

  emits("update:date", newDate);
}); */

function selectService(service) {
  selectedService.value = service;
  isOpen.value = false;
  emits("update:asignTo", service);
}

onMounted(async () => {
  const { data, error } = await supabase.from("services").select("id, title");

  if (error) {
    return;
  }

  services.value = data;
  if (props.task && props.task.assign_to) {
    const service = services.value.find((service) => service.id === props.task.assign_to);
    selectedService.value = service;
  }
});
</script>

<style scoped></style>
