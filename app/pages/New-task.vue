<template>
    <div>
        <HeaderComponent />
        <div class="my-5 w-5/6 mx-auto">
            <Breadcrumb>
                <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">
                    Dashboard
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbPage>Campagne de communication 2025</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div class="flex pt-6">
            <!-- Sidebar -->
            <TaskAside />

            <!-- Main Content -->
            <main class="flex-1 px-8">
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 h-full p-5">
                   <div class="mb-5">
                        <Input placeholder="Titre de la tache" class="p-5" />
                   </div>
                   <div class="mb-5">
                        <Textarea placeholder="Description de la tache" class="p-5 h-48" />
                   </div>
                   <div>
                        <Button class="p-5 cursor-pointer">Ajouter la tâche</Button>
                   </div>
                </div>
            </main>

        </div>
    </div>
</template>

<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from '@/components/ui/input'
import { Slash } from 'lucide-vue-next'
import { Textarea } from '@/components/ui/textarea'
import { Button } from "~/components/ui/button"

</script>

<style scoped>

</style>