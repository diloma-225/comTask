<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import { DateFormatter, getLocalTimeZone, parseDate } from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";

import { ref } from "vue";
function cn(...classes: Array<string | boolean | null | undefined>) {
  return classes.filter((c) => !!c).join(" ");
}
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const props = defineProps({
  dateEcheance: [Object, String], // Date JS ou ISO string
});

const emits = defineEmits(["selectedDate"]);

const value = ref<DateValue>();

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

watch(value, (newDate) => {
  emits("selectedDate", newDate);
});

// Convertir la date en DateValue shadcn
onMounted(() => {
  if (!props.dateEcheance) return;

  let isoString = "";

  if (props.dateEcheance instanceof Date) {
    isoString = props.dateEcheance.toISOString().substring(0, 10); // yyyy-mm-dd
  } else if (typeof props.dateEcheance === "string") {
    isoString = props.dateEcheance;
  }

  value.value = parseDate(isoString);
});
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-[280px] justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Choisir une date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>
