export default function useTask(){
    const countTasks = (project, status) => {
        return project.Tasks?.filter((t) => t.statut === status).length || 0;
    };

    const getProgress = (project, status) => {
        const total = project.Tasks?.length || 0;
        const count = countTasks(project, status);
        return total > 0 ? (count / total) * 100 : 0;
    };

    const getTaskStatus = (task) => {
        switch (task.statut) {
            case 0: return "À faire";
            case 1: return "Terminée";
            case 2: return "En cours";
            default: return "Statut inconnu";
        }
    }


    return {
        countTasks,
        getProgress,
        getTaskStatus
    }
}